import Image from 'next/image';

interface QRCodePreviewProps {
  qrCode: string;
  onPurchase: () => void;
}

export default function QRCodePreview({ qrCode, onPurchase }: QRCodePreviewProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Preview</h2>
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 rounded-lg p-8">
        {qrCode ? (
          <div className="relative w-64 h-64">
            <Image
              src={qrCode}
              alt="QR Code Preview"
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <p className="text-gray-500">Your QR code will appear here</p>
        )}
      </div>
      {qrCode && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={onPurchase}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Purchase Now
          </button>
        </div>
      )}
    </div>
  );
}