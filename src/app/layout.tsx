import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import Script from 'next/script';

import Providers from '~/app/providers';
import Layout from '~/lib/layout';

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
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
        <Analytics />
        <Script
          id="pendo"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(apiKey){
                (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
                v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
                    o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
                    y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
                    z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
              })('8c32f86e-5d5f-4802-7a89-77e039043580');
            `,
          }}
        />
      </body>
    </html>
  );
};

export default RootLayout;
