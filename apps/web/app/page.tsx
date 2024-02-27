'use client';

// import type { Metadata } from 'next';
import { useEffect, useState } from 'react';
import { CopyEmailHtml } from '@/components/copy-email-html';
import { EditorPreview } from '@/components/editor-preview';
import { PreviewEmail } from '@/components/preview-email';
import { useEditorContext } from '@/stores/editor-store';

// export const dynamic = 'force-static';

// export const metadata: Metadata = {
//   title: 'Editor',
//   description: 'Email Editor',
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-video-preview': -1,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },
//   openGraph: {
//     siteName: 'JigsawStack',
//     title: 'JigsawStack',
//     description: 'Email Editor',
//     type: 'website',
//     url: 'https://jigsawstack.com',
//     locale: 'en-US',
//     images: {
//       url: '/og-image.png',
//       width: 1200,
//       height: 630,
//       alt: 'Preview',
//     },
//   },
// };

interface MsgObject {
  subject: string;
  html?: string;
  json?: string;
}

export default function LandingPage() {
  const [json, setJson] = useState();
  const { setSubject } = useEditorContext((s) => s);

  const messageHandler = (e: MessageEvent) => {
    const parseData: MsgObject = JSON.parse(e.data);
    if (parseData.subject || parseData.html) {
      setSubject(parseData.subject || '');
      if (parseData.json) {
        const jsonData = JSON.parse(parseData.json);
        if (jsonData) {
          setJson(jsonData);
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('message', messageHandler);
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, []);

  return (
    <main className="mx-auto w-full px-5">
      <div className=" mt-6 flex items-center justify-end gap-1.5 px-2">
        <PreviewEmail />
        <CopyEmailHtml />
      </div>
      <div className="mx-auto max-w-[calc(36rem+40px)] ">
        <EditorPreview content={json} />
      </div>
    </main>
  );
}
