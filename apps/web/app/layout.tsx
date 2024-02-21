import './globals.css';

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { GoogleTagManager } from '@next/third-parties/google';
import { TopLoader } from '@/components/top-loader';
import { config } from '@/lib/config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://jigsawstack.com'),
  title: 'Email Editor',
  description: 'Email editor based on Maily.to',
  icons: {
    icon: [
      {
        url: '/brand/logo.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/brand/logo.svg',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    siteName: 'Jigsawstack',
    description: 'Email editor based on Maily.to',
    type: 'website',
    url: 'https://maily.to',
    locale: 'en-US',
    images: {
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Maily Preview',
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <html lang="en">
      <body className={inter.className}>
        <TopLoader />
        {children}
        <Toaster richColors />
        <GoogleTagManager gtmId={config.googleTrackingId} />
      </body>
    </html>
  );
}
