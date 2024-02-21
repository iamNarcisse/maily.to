import './globals.css';

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { Toaster } from 'sonner';
import {
  MAILY_API_KEY,
  MAILY_ENDPOINT,
  MAILY_PROVIDER,
} from '@/utils/constants';
import { EditorProvider } from '@/stores/editor-store';
import { TopLoader } from '@/components/top-loader';

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
  const cookieStore = cookies();
  const apiKey = cookieStore.get(MAILY_API_KEY)?.value;
  const endpoint = cookieStore.get(MAILY_ENDPOINT)?.value;
  const provider = cookieStore.get(MAILY_PROVIDER)?.value;
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopLoader />
        <EditorProvider apiKey={apiKey} endpoint={endpoint} provider={provider}>
          {children}
        </EditorProvider>
        <Toaster richColors />
        {/* <GoogleTagManager gtmId={config.googleTrackingId} /> */}
      </body>
    </html>
  );
}
