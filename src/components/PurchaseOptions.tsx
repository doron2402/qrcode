import { useState } from 'react';
import { QRCodeFormData, PRICES } from '@/types';

interface PurchaseOptionsProps {
  formData: QRCodeFormData;
  onUpdate: (data: QRCodeFormData) => void;
}

export default function PurchaseOptions({ formData, onUpdate }: PurchaseOptionsProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onUpdate({
      ...formData,
      [name]: value
    });
  };

  const handleQuantityChange = (type: 'sticker' | 'tattoo', delta: number) => {
    const field = `${type}Quantity`;
    const newValue = Math.max(0, formData[field] + delta);
    onUpdate({
      ...formData,
      [field]: newValue
    });
  };

  const calculatePrice = () => {
    const stickerTotal = PRICES.sticker[formData.stickerSize] * formData.stickerQuantity;
    const tattooTotal = PRICES.tattoo[formData.tattooSize] * formData.tattooQuantity;
    return (stickerTotal + tattooTotal).toFixed(2);
  };

  const inputClassName = "mt-1 block w-full rounded-md border border-black shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black";
  const numberInputClassName = "w-16 text-center rounded-md border border-black shadow-sm focus:border-blue-500 focus:ring-blue-500";

  return (
    <div className="space-y-6">
      {/* Stickers Section */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Stickers</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="stickerSize" className="block text-sm font-medium text-gray-700">
              Size
            </label>
            <select
              id="stickerSize"
              name="stickerSize"
              className={inputClassName}
              value={formData.stickerSize}
              onChange={handleInputChange}
            >
              <option value="small">Small ($5)</option>
              <option value="medium">Medium ($6)</option>
              <option value="large">Large ($7)</option>
            </select>
          </div>
          <div>
            <label htmlFor="stickerQuantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => handleQuantityChange('sticker', -1)}
                className="p-1 rounded-md border border-black hover:bg-gray-50"
              >
                -
              </button>
              <input
                type="number"
                id="stickerQuantity"
                name="stickerQuantity"
                min="0"
                value={formData.stickerQuantity}
                onChange={handleInputChange}
                className={numberInputClassName}
              />
              <button
                type="button"
                onClick={() => handleQuantityChange('sticker', 1)}
                className="p-1 rounded-md border border-black hover:bg-gray-50"
              >
                +
              </button>
            </div>
            {formData.stickerQuantity > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                Sticker Total: ${(formData.stickerQuantity * PRICES.sticker[formData.stickerSize]).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tattoos Section */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Tattoos</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="tattooSize" className="block text-sm font-medium text-gray-700">
              Size
            </label>
            <select
              id="tattooSize"
              name="tattooSize"
              className={inputClassName}
              value={formData.tattooSize}
              onChange={handleInputChange}
            >
              <option value="small">Small ($5)</option>
              <option value="medium">Medium ($6)</option>
              <option value="large">Large ($7)</option>
            </select>
          </div>
          <div>
            <label htmlFor="tattooQuantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => handleQuantityChange('tattoo', -1)}
                className="p-1 rounded-md border border-black hover:bg-gray-50"
              >
                -
              </button>
              <input
                type="number"
                id="tattooQuantity"
                name="tattooQuantity"
                min="0"
                value={formData.tattooQuantity}
                onChange={handleInputChange}
                className={numberInputClassName}
              />
              <button
                type="button"
                onClick={() => handleQuantityChange('tattoo', 1)}
                className="p-1 rounded-md border border-black hover:bg-gray-50"
              >
                +
              </button>
            </div>
            {formData.tattooQuantity > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                Tattoo Total: ${(formData.tattooQuantity * PRICES.tattoo[formData.tattooSize]).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-gray-900">Total: ${calculatePrice()}</span>
      </div>
    </div>
  );
}