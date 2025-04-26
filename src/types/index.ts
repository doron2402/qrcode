export type Size = 'small' | 'medium' | 'large';
export type ContentType = 'url' | 'text' | 'phone' | 'sms' | 'whatsapp';

export interface QRCodeFormData {
  contentType: ContentType;
  content: string;
  font: string;
  fontColor: string;
  background: string;
  stickerQuantity: number;
  stickerSize: Size;
  tattooQuantity: number;
  tattooSize: Size;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  zipCode: string;
  state: string;
  country: string;
  address: string;
}

export interface PurchaseFormData extends QRCodeFormData {
  customerInfo: CustomerInfo;
  billingInfo: CustomerInfo;
  sameAsShipping: boolean;
}

export const PRICES = {
  sticker: {
    small: 5,
    medium: 6,
    large: 7
  },
  tattoo: {
    small: 5,
    medium: 6,
    large: 7
  }
} as const;