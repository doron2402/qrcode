'use client';

import { useState } from 'react';
import { QRCodeFormData } from '@/types';

interface QRCodeWizardProps {
  onGenerate: (data: QRCodeFormData) => void;
}

type QRCodeType = 'link' | 'text' | 'email' | 'call' | 'sms' | 'v-card' | 'whatsapp' | 'wifi' | 'app' | 'event';

interface WifiData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
}

interface AppData {
  platform: 'ios' | 'android' | 'both';
  appId: string;
}

export default function QRCodeWizard({ onGenerate }: QRCodeWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [qrType, setQrType] = useState<QRCodeType>('url');
  const [content, setContent] = useState('');
  const [wifiData, setWifiData] = useState<WifiData>({
    ssid: '',
    password: '',
    encryption: 'WPA'
  });
  const [appData, setAppData] = useState<AppData>({
    platform: 'both',
    appId: ''
  });
  const [design, setDesign] = useState({
    frame: 'none',
    color: '#000000',
    text: ''
  });

  const handleTypeSelect = (type: QRCodeType) => {
    setQrType(type);
    setContent('');
    setCurrentStep(2);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    if (value.trim() !== '') {
      setCurrentStep(3);
    }
  };

  const handleWifiDataChange = (field: keyof WifiData, value: string) => {
    setWifiData(prev => ({ ...prev, [field]: value }));
    if (field === 'ssid' && value.trim() !== '') {
      setCurrentStep(3);
    }
  };

  const handleAppDataChange = (field: keyof AppData, value: string) => {
    setAppData(prev => ({ ...prev, [field]: value }));
    if (field === 'appId' && value.trim() !== '') {
      setCurrentStep(3);
    }
  };

  const handleDesignChange = (field: keyof typeof design, value: string) => {
    setDesign(prev => ({ ...prev, [field]: value }));
  };

  const handleDesignSubmit = () => {
    let finalContent = content;

    // Format content based on type
    switch (qrType) {
      case 'wifi':
        finalContent = `WIFI:S:${wifiData.ssid};T:${wifiData.encryption};P:${wifiData.password};;`;
        break;
      case 'call':
        finalContent = `tel:${content}`;
        break;
      case 'sms':
        finalContent = `sms:${content}`;
        break;
      case 'whatsapp':
        finalContent = `https://wa.me/${content}`;
        break;
      case 'email':
        finalContent = `mailto:${content}`;
        break;
      case 'app':
        if (appData.platform === 'ios') {
          finalContent = `https://apps.apple.com/app/id${appData.appId}`;
        } else if (appData.platform === 'android') {
          finalContent = `https://play.google.com/store/apps/details?id=${appData.appId}`;
        } else {
          // For both platforms, we'll use a custom URL that redirects based on the device
          finalContent = `${window.location.origin}/app/${appData.appId}`;
        }
        break;
      // Add more cases for other types
    }

    onGenerate({
      contentType: qrType,
      content: finalContent,
      fontColor: design.color,
      background: '#FFFFFF',
      stickerQuantity: 0,
      stickerSize: 'small',
      tattooQuantity: 0,
      tattooSize: 'small',
      text: design.text
    });
  };

  const handleGenerate = () => {
    handleDesignSubmit();
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep === step
                ? 'bg-blue-600 text-white'
                : currentStep > step
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {step}
          </div>
          {step < 3 && (
            <div
              className={`w-16 h-1 ${
                currentStep > step ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Step 1: Choose QR Code Type</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { type: 'link', label: 'Link' },
          { type: 'text', label: 'Text' },
          { type: 'email', label: 'Email' },
          { type: 'call', label: 'Call' },
          { type: 'sms', label: 'SMS' },
          { type: 'v-card', label: 'vCard' },
          { type: 'whatsapp', label: 'WhatsApp' },
          { type: 'wifi', label: 'WiFi' },
          { type: 'app', label: 'App' },
          { type: 'event', label: 'Event' }
        ].map(({ type, label }) => (
          <button
            key={type}
            onClick={() => handleTypeSelect(type as QRCodeType)}
            className={`p-4 border rounded-lg transition-colors ${
              qrType === type
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className={`space-y-6 ${currentStep !== 2 ? 'opacity-50' : ''}`}>
      <h2 className="text-2xl font-bold text-gray-900">Step 2: Enter Content</h2>
      {qrType === 'wifi' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SSID</label>
            <input
              type="text"
              value={wifiData.ssid}
              onChange={(e) => handleWifiDataChange('ssid', e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg py-3 px-4"
              placeholder="Enter your WiFi network name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={wifiData.password}
              onChange={(e) => handleWifiDataChange('password', e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg py-3 px-4"
              placeholder="Enter your WiFi password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Encryption</label>
            <select
              value={wifiData.encryption}
              onChange={(e) => handleWifiDataChange('encryption', e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg py-3 px-4"
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">No Password</option>
            </select>
          </div>
        </div>
      ) : qrType === 'app' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
            <select
              value={appData.platform}
              onChange={(e) => handleAppDataChange('platform', e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg py-3 px-4"
            >
              <option value="both">Both iOS & Android</option>
              <option value="ios">iOS Only</option>
              <option value="android">Android Only</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">App ID</label>
            <input
              type="text"
              value={appData.appId}
              onChange={(e) => handleAppDataChange('appId', e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg py-3 px-4"
              placeholder={appData.platform === 'ios' ? 'Enter App Store ID' : 'Enter Package Name'}
            />
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {qrType === 'email' ? 'Email Address' :
             qrType === 'call' ? 'Phone Number' :
             qrType === 'sms' ? 'Phone Number' :
             qrType === 'whatsapp' ? 'Phone Number' :
             qrType === 'text' ? 'Text Message' :
             qrType === 'link' ? 'URL' :
             qrType === 'v-card' ? 'vCard Information' :
             qrType === 'event' ? 'Event Details' :
             'Content'}
          </label>
          <input
            type="text"
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg py-3 px-4"
            placeholder={
              qrType === 'email' ? "Enter email address, e.g. john@example.com" :
              qrType === 'call' ? "Enter phone number, e.g. +15105551234" :
              qrType === 'sms' ? "Enter phone number, e.g. +15105551234" :
              qrType === 'whatsapp' ? "Enter phone number, e.g. +15105551234" :
              qrType === 'link' ? "Enter URL, e.g. https://example.com" :
              qrType === 'text' ? "Enter text message" :
              qrType === 'v-card' ? "Enter vCard information" :
              qrType === 'event' ? "Enter event details" :
              `Enter ${qrType} content...`
            }
          />
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className={`space-y-6 ${currentStep !== 3 ? 'opacity-50' : ''}`}>
      <h2 className="text-2xl font-bold text-gray-900">Step 3: Design QR Code</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Frame</label>
          <select
            value={design.frame}
            onChange={(e) => handleDesignChange('frame', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="none">No Frame</option>
            <option value="rounded">Rounded</option>
            <option value="square">Square</option>
            <option value="circle">Circle</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Color</label>
          <input
            type="color"
            value={design.color}
            onChange={(e) => handleDesignChange('color', e.target.value)}
            className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Text Under QR Code</label>
          <input
            type="text"
            value={design.text}
            onChange={(e) => handleDesignChange('text', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter text to display under QR code"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      {renderStepIndicator()}
      <div className="space-y-12">
        {renderStep1()}
        {renderStep2()}
        {renderStep3()}
        <div className="flex justify-center">
          <button
            onClick={handleGenerate}
            className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg font-medium"
          >
            Generate QR Code
          </button>
        </div>
      </div>
    </div>
  );
}