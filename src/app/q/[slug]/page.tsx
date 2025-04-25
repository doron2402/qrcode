import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

interface QRPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: QRPageProps) {
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
    title: `${qrPage.user.name || 'User'}'s QR Code`,
    description: qrPage.content,
  };
}

export default async function QRPage({ params }: QRPageProps) {
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
            {qrPage.user.name || 'Anonymous'}'s QR Code
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