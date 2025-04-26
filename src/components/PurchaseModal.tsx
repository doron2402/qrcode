'use client';

import { useState } from 'react';
import { QRCodeFormData, CustomerInfo, PurchaseFormData, PRICES } from '@/types';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: QRCodeFormData;
  total: string;
}

export default function PurchaseModal({ isOpen, onClose, formData, total }: PurchaseModalProps) {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    zipCode: '',
    state: '',
    country: '',
    address: ''
  });

  const [billingInfo, setBillingInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    zipCode: '',
    state: '',
    country: '',
    address: ''
  });

  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [purchaseData, setPurchaseData] = useState<QRCodeFormData>(formData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBillingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSameAsShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSameAsShipping(checked);
    if (checked) {
      setBillingInfo(customerInfo);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = Math.max(0, parseInt(value) || 0);
    setPurchaseData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleSizeChange = (type: 'sticker' | 'tattoo', size: 'small' | 'medium' | 'large') => {
    const field = `${type}Size`;
    setPurchaseData(prev => ({
      ...prev,
      [field]: size
    }));
  };

  const calculatePrice = () => {
    const stickerTotal = PRICES.sticker[purchaseData.stickerSize] * purchaseData.stickerQuantity;
    const tattooTotal = PRICES.tattoo[purchaseData.tattooSize] * purchaseData.tattooQuantity;
    return (stickerTotal + tattooTotal).toFixed(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalPurchaseData: PurchaseFormData = {
      ...purchaseData,
      customerInfo,
      billingInfo: sameAsShipping ? customerInfo : billingInfo,
      sameAsShipping
    };
    // TODO: Handle form submission
    console.log('Form submitted:', finalPurchaseData);
  };

  const inputClassName = "mt-1 block w-full rounded-md border border-black shadow-sm focus:border-blue-500 focus:ring-blue-500";
  const numberInputClassName = "w-24 text-center rounded-md border border-black shadow-sm focus:border-blue-500 focus:ring-blue-500";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Complete Your Purchase</h1>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Purchase Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      className={inputClassName}
                      value={purchaseData.stickerSize}
                      onChange={(e) => handleSizeChange('sticker', e.target.value as 'small' | 'medium' | 'large')}
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
                    <input
                      type="number"
                      id="stickerQuantity"
                      name="stickerQuantity"
                      min="0"
                      value={purchaseData.stickerQuantity}
                      onChange={handleQuantityChange}
                      className={numberInputClassName}
                    />
                    {purchaseData.stickerQuantity > 0 && (
                      <p className="mt-2 text-sm text-gray-600">
                        Sticker Total: ${(purchaseData.stickerQuantity * PRICES.sticker[purchaseData.stickerSize]).toFixed(2)}
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
                      className={inputClassName}
                      value={purchaseData.tattooSize}
                      onChange={(e) => handleSizeChange('tattoo', e.target.value as 'small' | 'medium' | 'large')}
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
                    <input
                      type="number"
                      id="tattooQuantity"
                      name="tattooQuantity"
                      min="0"
                      value={purchaseData.tattooQuantity}
                      onChange={handleQuantityChange}
                      className={numberInputClassName}
                    />
                    {purchaseData.tattooQuantity > 0 && (
                      <p className="mt-2 text-sm text-gray-600">
                        Tattoo Total: ${(purchaseData.tattooQuantity * PRICES.tattoo[purchaseData.tattooSize]).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={customerInfo.firstName}
                    onChange={handleInputChange}
                    required
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={customerInfo.lastName}
                    onChange={handleInputChange}
                    required
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    required
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                    className={inputClassName}
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    required
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={customerInfo.zipCode}
                    onChange={handleInputChange}
                    required
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={customerInfo.state}
                    onChange={handleInputChange}
                    required
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={customerInfo.country}
                    onChange={handleInputChange}
                    required
                    className={inputClassName}
                  />
                </div>
              </div>
            </div>

            {/* Billing Information */}
            <div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="sameAsShipping"
                  checked={sameAsShipping}
                  onChange={handleSameAsShippingChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="sameAsShipping" className="ml-2 block text-sm text-gray-900">
                  Billing address same as shipping
                </label>
              </div>

              {!sameAsShipping && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="billingFirstName" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="billingFirstName"
                      name="firstName"
                      value={billingInfo.firstName}
                      onChange={handleBillingInputChange}
                      required
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="billingLastName" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="billingLastName"
                      name="lastName"
                      value={billingInfo.lastName}
                      onChange={handleBillingInputChange}
                      required
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="billingPhone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="billingPhone"
                      name="phone"
                      value={billingInfo.phone}
                      onChange={handleBillingInputChange}
                      required
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="billingEmail" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="billingEmail"
                      name="email"
                      value={billingInfo.email}
                      onChange={handleBillingInputChange}
                      required
                      className={inputClassName}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      id="billingAddress"
                      name="address"
                      value={billingInfo.address}
                      onChange={handleBillingInputChange}
                      required
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="billingZipCode" className="block text-sm font-medium text-gray-700">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="billingZipCode"
                      name="zipCode"
                      value={billingInfo.zipCode}
                      onChange={handleBillingInputChange}
                      required
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="billingState" className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <input
                      type="text"
                      id="billingState"
                      name="state"
                      value={billingInfo.state}
                      onChange={handleBillingInputChange}
                      required
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="billingCountry" className="block text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <input
                      type="text"
                      id="billingCountry"
                      name="country"
                      value={billingInfo.country}
                      onChange={handleBillingInputChange}
                      required
                      className={inputClassName}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-900">Total: ${calculatePrice()}</span>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Complete Purchase
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}