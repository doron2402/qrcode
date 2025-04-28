interface Config {
  baseUrl: string;
  api: {
    slug: string;
    checkout: string;
  };
  qr: {
    defaultColor: string;
    defaultBgColor: string;
    maxSize: number;
  };
  stripe: {
    publicKey: string;
  };
}

const config: Config = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  api: {
    slug: '/api/slug',
    checkout: '/api/checkout',
  },
  qr: {
    defaultColor: '#000000',
    defaultBgColor: '#FFFFFF',
    maxSize: 1024,
  },
  stripe: {
    publicKey: process.env.NEXT_PUBLIC_STRIPE_KEY || '',
  },
} as const;

export default config;