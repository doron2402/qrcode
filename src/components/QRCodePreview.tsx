import Image from 'next/image';

interface QRCodePreviewProps {
  qrCode: string;
  onPurchase: () => void;
  text?: string;
}

export default function QRCodePreview({ qrCode, onPurchase, text }: QRCodePreviewProps) {
  const handleDownload = () => {
    if (qrCode) {
      const link = document.createElement('a');
      link.href = qrCode;
      link.download = 'qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Preview</h2>
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 rounded-lg p-8">
        {qrCode ? (
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-64">
              <Image
                src={qrCode}
                alt="QR Code Preview"
                fill
                className="object-contain"
              />
            </div>
            {text && (
              <p className="mt-4 text-center text-gray-700 font-medium">{text}</p>
            )}
          </div>
        ) : (
          <p className="text-gray-500">Your QR code will appear here</p>
        )}
      </div>
      {qrCode && (
        <div className="mt-6 flex justify-center space-x-4">
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download QR Code
          </button>
          <button
            type="button"
            onClick={onPurchase}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Make Dynamic
          </button>
        </div>
      )}
    </div>
  );
}