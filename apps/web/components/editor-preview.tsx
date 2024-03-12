'use client';

import type { EditorProps } from '@maily-to/core';
import { Editor } from '@maily-to/core';
import type { JSONContent, Editor as TiptapEditor } from '@tiptap/core';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { renderAsync } from '@maily-to/render';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { cn } from '@/utils/classname';
import { useEditorContext } from '@/stores/editor-store';

interface EditorPreviewProps {
  className?: string;
  content?: JSONContent;
  config?: Partial<EditorProps['config']>;
}

export function EditorPreview(props: EditorPreviewProps) {
  const { className, content: defaultContent, config: defaultConfig } = props;
  const [jsonContent, setJsonContent] = useState(defaultContent);

  const { editor, setEditor, setJson, subject, setSubject } = useEditorContext(
    (s) => s
  );

  useEffect(() => {
    if (defaultContent) {
      setJsonContent(defaultContent);
    }
  }, [defaultContent]);

  const onLogChange = async (raw: JSONContent) => {
    if (!raw) {
      return;
    }

    const html = await renderAsync(raw, {
      preview: '',
    });
    const msg = { html, subject, json: JSON.stringify(raw) };
    parent?.postMessage(JSON.stringify({ action_type: 'edit', ...msg }), '*');
  };

  const defaultHtml = ``;

  return (
    <div className={cn('mt-8', className)}>
      <Label className="flex items-center font-normal">
        <span className="w-30 shrink-0 font-normal text-gray-600 after:ml-0.5 after:text-red-400 after:content-['*']">
          Name
        </span>
        <Input
          className="h-auto rounded-none border-none py-2.5 font-normal focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => {
            setSubject(e.target.value);
          }}
          placeholder="Enter template name..."
          type="text"
          value={subject}
        />
      </Label>

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
          onBlur={(e: TiptapEditor) => {
            if (e?.getJSON()) {
              onLogChange(e.getJSON());
            }
          }}
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
