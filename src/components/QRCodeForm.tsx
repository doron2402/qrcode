import { useState } from 'react';
import { QRCodeFormData, PRICES } from '@/types';

interface QRCodeFormProps {
  onGenerate: (formData: QRCodeFormData) => void;
}

export default function QRCodeForm({ onGenerate }: QRCodeFormProps) {
  const [formData, setFormData] = useState<QRCodeFormData>({
    contentType: 'url',
    content: '',
    font: 'Arial',
    fontColor: '#000000',
    background: '#FFFFFF',
    stickerQuantity: 0,
    stickerSize: 'medium',
    tattooQuantity: 0,
    tattooSize: 'medium'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const inputClassName = "mt-1 block w-full rounded-md border border-black shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black";
  const selectClassName = "mt-1 block w-full rounded-md border border-black shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black";
  const colorInputClassName = "mt-1 block w-full h-10 rounded-md border border-black shadow-sm focus:border-blue-500 focus:ring-blue-500";

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm">
      <form className="space-y-6">
        <div>
          <label htmlFor="contentType" className="block text-sm font-medium text-gray-700">
            Content Type
          </label>
          <select
            id="contentType"
            name="contentType"
            className={selectClassName}
            value={formData.contentType}
            onChange={handleInputChange}
          >
            <option value="url">URL</option>
            <option value="text">Text</option>
            <option value="phone">Phone Number (Call)</option>
            <option value="sms">Phone Number (Text Message)</option>
            <option value="whatsapp">WhatsApp Number</option>
          </select>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            {formData.contentType === 'url' ? 'URL' :
             formData.contentType === 'text' ? 'Text' :
             formData.contentType === 'phone' ? 'Phone Number' :
             formData.contentType === 'sms' ? 'Phone Number' :
             'WhatsApp Number'}
          </label>
          <textarea
            id="content"
            name="content"
            rows={3}
            className={inputClassName}
            value={formData.content}
            onChange={handleInputChange}
            placeholder={
              formData.contentType === 'url' ? 'Enter URL (e.g., https://example.com)' :
              formData.contentType === 'text' ? 'Enter text for your QR code' :
              formData.contentType === 'phone' ? 'Enter phone number (e.g., +1234567890)' :
              formData.contentType === 'sms' ? 'Enter phone number (e.g., +1234567890)' :
              'Enter WhatsApp number (e.g., +1234567890)'
            }
          />
        </div>

        <div>
          <label htmlFor="fontColor" className="block text-sm font-medium text-gray-700">
            QR Code Color
          </label>
          <input
            type="color"
            id="fontColor"
            name="fontColor"
            className={colorInputClassName}
            value={formData.fontColor}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="background" className="block text-sm font-medium text-gray-700">
            Background Color
          </label>
          <input
            type="color"
            id="background"
            name="background"
            className={colorInputClassName}
            value={formData.background}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onGenerate(formData)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Generate QR Code
          </button>
        </div>
      </form>
    </div>
  );
}