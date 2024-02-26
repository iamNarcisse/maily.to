import type { Metadata } from 'next';
import { CopyEmailHtml } from '@/components/copy-email-html';
import { EditorPreview } from '@/components/editor-preview';
import { PreviewEmail } from '@/components/preview-email';

// export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Editor',
  description: 'Email Editor',
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
    siteName: 'JigsawStack',
    title: 'JigsawStack',
    description: 'Email Editor',
    type: 'website',
    url: 'https://jigsawstack.com',
    locale: 'en-US',
    images: {
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Preview',
    },
  },
};

export default function LandingPage() {
  return (
    <main className="mx-auto w-full max-w-[calc(36rem+40px)] px-5">
      <div className=" mt-6 flex items-center justify-end gap-1.5">
        <PreviewEmail />
        <CopyEmailHtml />
      </div>
      <EditorPreview />
    </main>
  );
}
