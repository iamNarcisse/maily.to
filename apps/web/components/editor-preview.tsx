'use client';

import type { EditorProps } from '@maily-to/core';
import { Editor } from '@maily-to/core';
import type { JSONContent, Editor as TiptapEditor } from '@tiptap/core';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PreviewTextInfo } from './preview-text-info';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { cn } from '@/utils/classname';
import { useEditorContext } from '@/stores/editor-store';

interface EditorPreviewProps {
  className?: string;
  content?: JSONContent;
  config?: Partial<EditorProps['config']>;
}

// interface MsgObject {
//   subject: string;
//   html?: string;
//   json?: string;
// }

export function EditorPreview(props: EditorPreviewProps) {
  const { className, content: defaultContent, config: defaultConfig } = props;
  const [jsonContent, setJsonContent] = useState(defaultContent);

  const {
    editor,
    previewText,
    setPreviewText,
    setEditor,
    setJson,
    subject,
    setSubject,
  } = useEditorContext((s) => s);

  useEffect(() => {
    if (defaultContent) {
      setJsonContent(defaultContent);
    }
  }, [defaultContent]);

  const defaultHtml = ``;

  return (
    <div className={cn('mt-8', className)}>
      <Label className="flex items-center font-normal">
        <span className="w-20 shrink-0 font-normal text-gray-600 after:ml-0.5 after:text-red-400 after:content-['*']">
          Subject
        </span>
        <Input
          className="h-auto rounded-none border-none py-2.5 font-normal focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => {
            setSubject(e.target.value);
          }}
          placeholder="Email Subject"
          type="text"
          value={subject}
        />
      </Label>

      <div className="relative my-6">
        <Input
          className="h-auto rounded-none border-x-0 border-gray-300 px-0 py-2.5 pr-5 text-base focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => {
            setPreviewText(e.target.value);
          }}
          placeholder="Preview Text"
          type="text"
          value={previewText}
        />
        <span className="absolute right-0 top-0 flex h-full items-center">
          <PreviewTextInfo />
        </span>
      </div>
      <div>
        {!editor ? (
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin text-gray-400" />
          </div>
        ) : null}
        <Editor
          config={{
            hasMenuBar: false,
            wrapClassName: 'editor-wrap',
            bodyClassName: '!mt-0 !border-0 !p-0',
            contentClassName: 'editor-content',
            toolbarClassName: 'flex-wrap !items-start',
            spellCheck: false,
            autofocus: false,
            ...defaultConfig,
          }}
          contentHtml={defaultHtml}
          contentJson={jsonContent}
          onCreate={(e) => {
            setEditor(e as unknown as TiptapEditor);
            setJson(e?.getJSON() || {});
          }}
          onUpdate={(e) => {
            setEditor(e as unknown as TiptapEditor);
            setJson(e?.getJSON() || {});
          }}
        />
      </div>
    </div>
  );
}
