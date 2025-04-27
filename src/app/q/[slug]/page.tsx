'use server';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import type { User, QRPage } from '@/types/prisma';
import QRCode from 'qrcode';
import Image from 'next/image';
import { motion } from 'framer-motion';

type PageProps = {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const getUserName = (user: User, defaultName: string) => {
  if (user) {
    return `${user?.firstName} ${user?.lastName}`;
  }
  return defaultName;
};


// Next.js automatically runs this as a Server Component since it's in the app directory
// and named 'page.tsx'. Server Components allow us to use async/await and
// directly access backend resources like databases.
export default async function QRPage({ params }: PageProps) {
  console.log('QR Page params:', params);
  const qrPage = await prisma.qrpage.findUnique({
    where: { slug: params.slug },
    include: {
      qrcode: true
    }
  });

  let user = null;
  if (qrPage?.userId) {
    user = await prisma.user.findUnique({
      where: { id: qrPage?.userId },
    });

  }

  console.log('QR Page data:', JSON.stringify(qrPage, null, 2));

  if (!qrPage) {
    notFound();
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {getUserName(user, 'Anonymous')}
          </h1>
          <div className="mb-6">
            <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
              {/* QR Code will be rendered here */}
              <Image
                src={await QRCode.toDataURL(qrPage.qrcode.content, {
                  width: 256,
                  margin: 0,
                  color: {
                    dark: qrPage.qrcode.color || "#000000",
                    light: qrPage.qrcode.backgroundColor || "#ffffff"
                  }
                })}
                alt="QR Code"
                width={256}
                height={256}
                className="mx-auto"
              />
            </div>
          </div>
          <p className="text-lg text-gray-600 mb-6">{qrPage.qrcode.content}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm">
              {qrPage.qrcode.type}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-6 text-center bg-white bg-opacity-90 border-t border-gray-200">
        <p className="text-gray-600 mb-4">Want to generate your own QR code?</p>
        <a
          href="/create"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Your QR Code
        </a>
      </div>
    </div>
  );
}