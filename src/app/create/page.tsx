'use client';

import { useState } from 'react';
import QRCode from 'qrcode';
import QRCodeForm from '@/components/QRCodeForm';
import QRCodePreview from '@/components/QRCodePreview';
import PurchaseModal from '@/components/PurchaseModal';
import { QRCodeFormData } from '@/types';
import config from '@/config';

export default function CreatePage() {
  const [qrCode, setQrCode] = useState<string>('');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [formData, setFormData] = useState<QRCodeFormData>({
    contentType: 'url',
    content: 'https://example.com',
    slug: '',
    font: 'Arial',
    fontColor: '#000000',
    background: '#FFFFFF',
    stickerQuantity: 0,
    stickerSize: 'small',
    tattooQuantity: 0,
    tattooSize: 'small'
  });

  const handleGenerate = async (data: QRCodeFormData) => {
    try {
      let qrContent = data.content;
      // Format content based on type
      switch (data.contentType) {
        case 'phone':
          qrContent = `tel:${data.content}`;
          break;
        case 'sms':
          qrContent = `sms:${data.content}`;
          break;
        case 'whatsapp':
          qrContent = `https://wa.me/${data.content}`;
          break;
        case 'url':
          qrContent = data.content;
          break;
        case 'hosted':
          qrContent = `${config.baseUrl}/q/${data.content}`;
          break;
        // URL and text don't need special formatting
      }

      const qrCodeDataUrl = await QRCode.toDataURL(qrContent, {
        color: {
          dark: data.fontColor,
          light: data.background
        },
        width: 400,
        margin: 1
      });
      setQrCode(qrCodeDataUrl);
      setFormData(prevData => ({
        ...prevData,
        content: qrContent
      }));

    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Create Your QR Code</h1>
          <p className="mt-4 text-xl text-gray-600">Customize your QR code for stickers or tattoos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <QRCodeForm onGenerate={handleGenerate} />
          <QRCodePreview
            qrCode={qrCode}
            onPurchase={() => setShowPurchaseModal(true)}
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