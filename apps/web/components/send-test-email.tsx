'use client';

import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import { Asterisk, Loader2 } from 'lucide-react';
import { shallow } from 'zustand/shallow';
import { sendTestEmailAction } from '@/actions/email';
import { useServerAction } from '@/utils/use-server-action';
import { useEditorContext } from '@/stores/editor-store';
import { catchActionError } from '@/actions/error';

interface SubmitButtonProps {
  disabled?: boolean;
}

function SubmitButton(props: SubmitButtonProps) {
  const { disabled } = props;
  const { pending } = useFormStatus();

  return (
    <button
      className="flex items-center rounded-md bg-white px-2 py-1 text-sm text-black hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={disabled || pending}
      type="submit"
    >
      {pending ? (
        <Loader2 className="mr-1 inline-block animate-spin" size={16} />
      ) : (
        <Asterisk className="mr-1 inline-block" size={16} />
      )}
      Send Email
    </button>
  );
}

export function SendTestEmail() {
  const { json, previewText, subject, from, replyTo, to, apiKey } =
    useEditorContext((s) => s, shallow);

  const [action] = useServerAction(
    catchActionError(sendTestEmailAction),
    (result) => {
      if (result?.error) {
        toast.error(result?.error?.message || 'Something went wrong');
        return;
      }

      toast.success('Email sent successfully');
    }
  );

  return (
    <form action={action}>
      <input name="subject" type="hidden" value={subject} />
      <input name="from" type="hidden" value={from} />
      <input name="replyTo" type="hidden" value={replyTo} />
      <input name="to" type="hidden" value={to} />
      <input name="json" type="hidden" value={JSON.stringify(json) || ''} />
      <input name="previewText" type="hidden" value={previewText} />
      <SubmitButton disabled={!apiKey} />
    </form>
  );
}
