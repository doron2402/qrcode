'use client';

import { useState } from 'react';
import QRCode from 'qrcode';
import Image from 'next/image';

export default function CreatePage() {
  const [formData, setFormData] = useState({
    content: '',
    type: 'sticker',
    size: 'medium',
    font: 'Arial',
    fontColor: '#000000',
    background: '#FFFFFF'
  });
  const [qrCode, setQrCode] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateQRCode = async () => {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(formData.content, {
        color: {
          dark: formData.fontColor,
          light: formData.background
        },
        width: 400,
        margin: 1
      });
      setQrCode(qrCodeDataUrl);
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
          {/* Form Section */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <form className="space-y-6">
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Content (URL or Text)
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base p-3 leading-6 text-black"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Enter URL or text for your QR code"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="sticker">Sticker</option>
                  <option value="tattoo">Tattoo</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                  Size
                </label>
                <select
                  id="size"
                  name="size"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                  value={formData.size}
                  onChange={handleInputChange}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              <div>
                <label htmlFor="fontColor" className="block text-sm font-medium text-gray-700">
                  QR Code Color
                </label>
                <input
                  type="color"
                  id="fontColor"
                  name="fontColor"
                  className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                  className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.background}
                  onChange={handleInputChange}
                />
              </div>

              <button
                type="button"
                onClick={generateQRCode}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Generate QR Code
              </button>
            </form>
          </div>

          {/* Preview Section */}
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
              <div className="mt-6 flex justify-center space-x-4">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Download
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Share
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}