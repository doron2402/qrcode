import { useState, useEffect } from 'react';
import { QRCodeFormData } from '@/types';
import config from '@/config';

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

  const [uniqueSlug, setUniqueSlug] = useState<string | null>(null);

  const fetchUniqueSlug = async () => {
    try {
      const response = await fetch(config.api.slug);
      const data = await response.json();
      if (data.slug) {
        setUniqueSlug(data.slug);
      }
    } catch (error) {
      console.error('Error fetching unique slug:', error);
    }
  };

  useEffect(() => {
    fetchUniqueSlug();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - QR Code Types */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">QR Code Types</h2>
            <div className="space-y-2">
              <button
                className={`w-full text-left px-4 py-3 rounded-lg ${
                  formData.contentType === 'url' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, contentType: 'url' }))}
              >
                URL
              </button>
              <button
                className={`w-full text-left px-4 py-3 rounded-lg ${
                  formData.contentType === 'text' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, contentType: 'text' }))}
              >
                Text
              </button>
              <button
                className={`w-full text-left px-4 py-3 rounded-lg ${
                  formData.contentType === 'phone' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, contentType: 'phone' }))}
              >
                Phone Number
              </button>
              <button
                className={`w-full text-left px-4 py-3 rounded-lg ${
                  formData.contentType === 'sms' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, contentType: 'sms' }))}
              >
                SMS
              </button>
              <button
                className={`w-full text-left px-4 py-3 rounded-lg ${
                  formData.contentType === 'whatsapp' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, contentType: 'whatsapp' }))}
              >
                WhatsApp
              </button>
              <button
                className={`w-full text-left px-4 py-3 rounded-lg ${
                  formData.contentType === 'hosted' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, contentType: 'hosted' }))}
              >
                Hosted Website
              </button>
              <button
                className={`w-full text-left px-4 py-3 rounded-lg ${
                  formData.contentType === 'email' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, contentType: 'email' }))}
              >
                Email
              </button>
            </div>
          </div>
        </div>

        {/* Middle Column - Content Input */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Content</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  {formData.contentType === 'url' ? 'Enter URL' :
                   formData.contentType === 'text' ? 'Enter Text' :
                   formData.contentType === 'phone' ? 'Enter Phone Number' :
                   formData.contentType === 'sms' ? 'Enter Phone Number' :
                   formData.contentType === 'hosted' ? 'Hosted URL' :
                   formData.contentType === 'email' ? 'Enter Email' :
                   'Enter WhatsApp Number'}
                </label>
                {formData.contentType === 'hosted' ? (
                  <div className="w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50 text-gray-600">
                    {config.baseUrl}/q/{uniqueSlug}
                  </div>
                ) : (
                  <textarea
                    id="content"
                    name="content"
                    rows={3}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder={
                      formData.contentType === 'url' ? 'https://example.com' :
                      formData.contentType === 'text' ? 'Enter your text here' :
                      formData.contentType === 'phone' ? '+1234567890' :
                      formData.contentType === 'sms' ? '+1234567890' :
                      formData.contentType === 'email' ? 'example@example.com' :
                      '+1234567890'
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - QR Code Preview and Customization */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Customize</h2>
            <div className="space-y-6">
              {/* QR Code Preview */}
              <div className="aspect-square bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <p>QR Code will appear here</p>
                  <p className="text-sm">Fill in the form to generate</p>
                </div>
              </div>

              {/* Colors */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="fontColor" className="block text-sm font-medium text-gray-700 mb-1">
                    QR Code Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      id="fontColor"
                      name="fontColor"
                      className="h-10 w-10 rounded border border-gray-300"
                      value={formData.fontColor}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      value={formData.fontColor}
                      onChange={handleInputChange}
                      className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="background" className="block text-sm font-medium text-gray-700 mb-1">
                    Background Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      id="background"
                      name="background"
                      className="h-10 w-10 rounded border border-gray-300"
                      value={formData.background}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      value={formData.background}
                      onChange={handleInputChange}
                      className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <button
                type="button"
                onClick={() => onGenerate(formData)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Generate QR Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}