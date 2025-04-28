import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, type = 'url', color = '#000000', backgroundColor = '#FFFFFF' } = body;

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    // Generate a unique slug
    const slug = nanoid(10);

    // Create the QR code first
    const qrcode = await prisma.qrcodes.create({
      data: {
        type,
        content,
        color,
        backgroundColor,
      },
    });

    // Create the QR page with the relation to the QR code
    const qrpage = await prisma.qrpage.create({
      data: {
        slug,
        qrcodeId: qrcode.id,
      },
      include: {
        qrcode: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/q/${qrpage.slug}`,
        slug: qrpage.slug,
        qrcode: qrpage.qrcode,
      },
    });
  } catch (error) {
    console.error('Error creating URL:', error);
    return NextResponse.json(
      { error: 'Failed to create URL' },
      { status: 500 }
    );
  }
}

// Get a specific URL by slug
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    const qrpage = await prisma.qrpage.findUnique({
      where: { slug },
      include: {
        qrcode: true,
      },
    });

    if (!qrpage) {
      return NextResponse.json(
        { error: 'URL not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/q/${qrpage.slug}`,
        slug: qrpage.slug,
        qrcode: qrpage.qrcode,
      },
    });
  } catch (error) {
    console.error('Error fetching URL:', error);
    return NextResponse.json(
      { error: 'Failed to fetch URL' },
      { status: 500 }
    );
  }
}