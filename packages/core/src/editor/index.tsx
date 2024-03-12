'use client';

import { Extension, FocusPosition, Editor as TiptapEditor } from '@tiptap/core';
import { EditorContent, JSONContent, useEditor } from '@tiptap/react';

import { useEffect, useState } from 'react';
import { EditorBubbleMenu } from './components/editor-bubble-menu';
import { EditorMenuBar } from './components/editor-menu-bar';
import { ImageBubbleMenu } from './components/image-bubble-menu';
import { SpacerBubbleMenu } from './components/spacer-bubble-menu';
import { extensions as defaultExtensions } from './extensions';
import { MailyContextType, MailyProvider } from './provider';
import { cn } from './utils/classname';

export type EditorProps = {
  contentHtml?: string;
  contentJson?: JSONContent;
  onUpdate?: (editor?: TiptapEditor) => void;
  onCreate?: (editor?: TiptapEditor) => void;
  onBlur?: (editor?: TiptapEditor) => void;
  extensions?: Extension[];
  config?: {
    hasMenuBar?: boolean;
    spellCheck?: boolean;
    wrapClassName?: string;
    toolbarClassName?: string;
    contentClassName?: string;
    bodyClassName?: string;
    autofocus?: FocusPosition;
  };
} & Partial<MailyContextType>;

export function Editor(props: EditorProps) {
  const {
    config: {
      wrapClassName = '',
      contentClassName = '',
      bodyClassName = '',
      hasMenuBar = true,
      spellCheck = false,
      autofocus = 'end',
    } = {},
    onCreate,
    onUpdate,
    onBlur,
    extensions,
    contentHtml,
    contentJson,
    variables,
    slashCommands,
  } = props;

  const [defaultContent, setDefaultContent] = useState(contentJson);

  useEffect(() => {
    if (contentJson) {
      setDefaultContent(contentJson);
    }
  }, [contentJson]);

  let formattedContent: any = null;
  if (defaultContent) {
    formattedContent =
      defaultContent?.type === 'doc'
        ? defaultContent
        : {
            type: 'doc',
            content: defaultContent,
          };
  } else if (contentHtml) {
    formattedContent = contentHtml;
  } else {
    formattedContent = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [],
        },
      ],
    };
  }

  const editor = useEditor(
    {
      editorProps: {
        attributes: {
          class: cn(`mly-prose mly-w-full`, contentClassName),
          spellCheck: spellCheck ? 'true' : 'false',
        },
        handleDOMEvents: {
          keydown: (_view, event) => {
            // prevent default event listeners from firing when slash command is active
            if (['ArrowUp', 'ArrowDown', 'Enter'].includes(event.key)) {
              const slashCommand = document.querySelector('#slash-command');
              if (slashCommand) {
                return true;
              }
            }
          },
        },
      },
      onCreate: ({ editor }) => {
        onCreate?.(editor);
      },
      onUpdate: ({ editor }) => {
        onUpdate?.(editor);
      },
      onBlur: ({ editor }) => {
        onBlur?.(editor);
      },
      extensions: [
        ...defaultExtensions({
          variables,
          slashCommands,
        }),
        ...(extensions || []),
      ],
      content: formattedContent,
      autofocus,
    },
    [defaultContent]
  );

  if (!editor) {
    return null;
  }

  return (
    <MailyProvider variables={variables}>
      <div className={cn('mly-editor mly-antialiased', wrapClassName)}>
        {hasMenuBar && <EditorMenuBar config={props.config} editor={editor} />}
        <div
          className={cn(
            'mly-mt-4 mly-rounded mly-border mly-bg-white mly-p-4',
            bodyClassName
          )}
        >
          <EditorBubbleMenu editor={editor} />
          <ImageBubbleMenu editor={editor} />
          <SpacerBubbleMenu editor={editor} />
          <EditorContent editor={editor} />
        </div>
      </div>
    </MailyProvider>
  );
}
