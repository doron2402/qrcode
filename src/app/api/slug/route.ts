import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { customAlphabet } from 'nanoid';

// Create custom nanoid with only lowercase letters and numbers
const generateSlug = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 8);

export async function GET() {
  try {
    let slug = generateSlug();
    let existingPage = await prisma.qrpage.findUnique({
      where: { slug }
    });

    // Keep generating new slugs until we find an available one
    while (existingPage) {
      slug = generateSlug();
      existingPage = await prisma.qrpage.findUnique({
        where: { slug }
      });
    }

    return NextResponse.json({
      slug
    });

  } catch (error) {
    console.error('Error generating unique slug:', error);
    return NextResponse.json(
      { error: 'Failed to generate unique slug' },
      { status: 500 }
    );
  }
}
