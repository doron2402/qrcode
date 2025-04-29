'use client';

import { useState } from 'react';
import QRCode from 'qrcode';
import QRCodeWizard from '@/components/QRCodeWizard';
import QRCodePreview from '@/components/QRCodePreview';
import PurchaseModal from '@/components/PurchaseModal';
import { QRCodeFormData } from '@/types';
import config from '@/config';

export default function CreatePage() {
  const [qrCode, setQrCode] = useState<string>('');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [formData, setFormData] = useState<QRCodeFormData>({
    contentType: 'link',
    content: 'https://example.com',
    font: 'Arial',
    fontColor: '#000000',
    background: '#FFFFFF',
    stickerQuantity: 0,
    stickerSize: 'small',
    tattooQuantity: 0,
    tattooSize: 'small',
    text: ''
  });

  const handleGenerate = async (data: QRCodeFormData) => {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(data.content, {
        color: {
          dark: data.fontColor,
          light: data.background
        },
        width: 400,
        margin: 1
      });
      setQrCode(qrCodeDataUrl);
      setFormData(data);
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Create Your QR Code</h1>
          <p className="mt-4 text-xl text-gray-600">Customize your QR code for stickers or tattoos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <QRCodeWizard onGenerate={handleGenerate} />
          <QRCodePreview
            qrCode={qrCode}
            onPurchase={() => setShowPurchaseModal(true)}
            text={formData.text}
          />
        </div>
      </div>

      <PurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        formData={formData}
        total="0.00"
      />
    </div>
  );
}