
import React, { useRef } from 'react';
import { Send, Mic, Paperclip } from 'lucide-react';

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: () => void;
  disabled?: boolean;
}

const ChatInput = ({
  message,
  setMessage,
  onSendMessage,
  disabled
}: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disabled && message.trim()) {
      onSendMessage();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && message.trim()) {
        onSendMessage();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex items-end gap-2 rounded-xl bg-zinc-100 p-2 outline outline-1 outline-neutral-200">
      {/* Attach Icon */}
      <button
        type="button"
        aria-label="Attach file"
        className="flex items-center justify-center rounded-lg hover:bg-zinc-200 transition-colors p-2 text-blue-600"
        tabIndex={0}
        disabled={disabled}
      >
        <Paperclip size={22} />
      </button>

      {/* Textarea */}
      <div className="flex-1 flex items-center">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask to Multilingual..."
          disabled={disabled}
          rows={1}
          className="
            w-full resize-none bg-transparent border-none outline-none text-base font-normal text-neutral-700
            font-['Poppins'] disabled:opacity-50 p-2 min-h-[44px] max-h-32
            scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-zinc-100
            "
          style={{ lineHeight: '1.35' }}
          aria-label="Type your message"
        />
      </div>

      {/* Voice (Mic) Icon */}
      <button
        type="button"
        aria-label="Start voice input"
        className="flex items-center justify-center rounded-lg hover:bg-zinc-200 transition-colors p-2 text-blue-600"
        tabIndex={0}
        disabled={disabled}
      >
        <Mic size={22} />
      </button>

      {/* Send (Enter) Icon */}
      <button
        type="submit"
        aria-label="Send message"
        className="flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors p-2 text-white shadow disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={disabled || !message.trim()}
      >
        <Send size={22} />
      </button>
    </form>
  );
};

export default ChatInput;

