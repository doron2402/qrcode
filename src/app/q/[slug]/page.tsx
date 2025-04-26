import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import type { User } from '.prisma/client';

type PageProps = {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const getUserName = ({ user }: { user: User }, defaultName: string) => {
  if (user) {
    return `${user?.firstName} ${user?.lastName}`;
  }
  return defaultName;
};

export async function generateMetadata({ params }: PageProps) {
  const qrPage = await prisma.qRPage.findUnique({
    where: { slug: params.slug },
    include: { user: true },
  });

  if (!qrPage) {
    return {
      title: 'QR Code Not Found',
    };
  }

  return {
    title: `${getUserName(qrPage, 'User')}'s QR Code`,
    description: qrPage.content,
  };
}

export default async function QRPage({ params }: PageProps) {
  const qrPage = await prisma.qRPage.findUnique({
    where: { slug: params.slug },
    include: { user: true },
  });

  if (!qrPage) {
    notFound();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {getUserName(qrPage, 'Anonymous')}
          </h1>
          <div className="mb-6">
            <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
              {/* QR Code will be rendered here */}
              <div className="text-gray-400">QR Code</div>
            </div>
          </div>
          <p className="text-lg text-gray-600 mb-6">{qrPage.content}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm">
              {qrPage.type}
            </div>
            <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm">
              {qrPage.size}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}