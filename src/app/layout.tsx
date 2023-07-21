import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';

import Providers from '~/app/providers';

type RootLayoutProps = {
  children: React.ReactNode;
};

const APP_NAME = 'Carissa Farry';

export const metadata: Metadata = {
  title: { default: APP_NAME, template: '%s | Carissa Farry' },
  description: "Carissa Farry's Portfolios",
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: '#FFFFFF',
  openGraph: {
    url: 'https://carissafarry.my.id',
    title: 'Carissa Farry',
    description: "Carissa Farry's Portfolios",
    images: {
      url: 'https://carissafarry.my.id/**nextarter-chakra**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250',
      alt: 'carissafarry.my.id og-image',
    },
  },
  twitter: {
    creator: '@carissafarry',
    card: 'summary_large_image',
  },
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
