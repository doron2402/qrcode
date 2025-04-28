import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PrismaClient } from '@prisma/client';

type CheckoutResponse = {
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
    };
    checkout: {
      id: string;
      stripeID: string;
    };
    qrcode: {
      id: string;
      content: string;
      type: string;
    };
    qrpage?: {
      url: string;
      slug: string;
    };
  };
};

export async function POST(request: Request) {

  try {
    const body = await request.json();
    console.log('POST /api/checkout - Starting checkout process');
    console.log('Request body:', body);
    const {
      // User data
      email,
      firstName,
      lastName,
      phone,
      address,
      zipCode,
      state,
      country,

      // Checkout data
      billingAddress,
      amountInCents,
      stripeID,

      // QR code data
      qrContent,
      qrType = 'url',
      qrColor = '#000000',
      qrBackgroundColor = '#FFFFFF',
    } = body;

    // Validate required fields
    if (!email || !firstName || !lastName || !qrContent || !amountInCents) {
      console.error('POST /api/checkout - Missing required fields (email, firstName, lastName, qrContent, amountInCents)');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Start a transaction to ensure all operations succeed or none do
    const result = await prisma.$transaction(async (tx: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>) => {
      console.log('POST /api/checkout - Creating user');
      // 1. Create the user
      const user = await tx.user.create({
        data: {
          email,
          firstName,
          lastName,
          phone,
          address,
          zipCode,
          state,
          country,
        },
      });

      console.log('POST /api/checkout - User created:', user);
      console.log('POST /api/checkout - Creating checkout record');
      // 2. Create the checkout record
      const checkout = await tx.checkout.create({
        data: {
          email,
          firstName,
          lastName,
          country: country || 'USA',
          city: billingAddress.city || '',
          state: billingAddress.state || '',
          zip: billingAddress.zip || '',
          address: billingAddress.address || '',
          billingAddress,
          amountInCents,
          stripeID,
          userId: user.id,
        },
      });

      console.log('POST /api/checkout - Checkout record created:', checkout);
      console.log('POST /api/checkout - Creating QR code');
      // 3. Create the QR code
      const qrcode = await tx.qrcodes.create({
        data: {
          type: qrType,
          content: qrContent,
          color: qrColor,
          backgroundColor: qrBackgroundColor,
        },
      });

      console.log('POST /api/checkout - QR code created:', qrcode);
      // 4. If type is hosted, create QR page
      let qrpage = null;
      if (qrType === 'hosted') {
        console.log(`POST /api/checkout - Creating QR page (Slug: ${qrContent})`);
        const slug = qrContent;
        qrpage = await tx.qrpage.create({
          data: {
            slug,
            qrcodeId: qrcode.id,
            userId: user.id,
          },
          include: {
            qrcode: true,
          },
        });

        console.log('POST /api/checkout - QR page created:', qrpage);
      }

      return {
        user,
        checkout,
        qrcode,
        qrpage,
      };
    });

    // Prepare the response
    const response: CheckoutResponse = {
      success: true,
      data: {
        user: {
          id: result.user.id,
          email: result.user.email,
        },
        checkout: {
          id: result.checkout.id,
          stripeID: result.checkout.stripeID,
        },
        qrcode: {
          id: result.qrcode.id,
          content: result.qrcode.content,
          type: result.qrcode.type,
        },
      },
    };

    // Add QR page URL if it was created
    if (result.qrpage) {
      response.data.qrpage = {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/q/${result.qrpage.slug}`,
        slug: result.qrpage.slug,
      };
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error processing checkout:', error);
    return NextResponse.json(
      { error: 'Failed to process checkout' },
      { status: 500 }
    );
  }
}
