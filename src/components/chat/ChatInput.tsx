
import React, { useRef, useState } from 'react';
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isListening, setIsListening] = useState(false);

  // Resize textarea for multiline input, up to maxHeight
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(
        textareaRef.current.scrollHeight,
        160 // max-height in px (40*4 lines)
      ) + "px";
    }
  };

  // Textarea: Enter sends, Shift+Enter makes new line
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && message.trim()) {
        onSendMessage();
        // Reset height after sending message
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
      }
    }
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disabled && message.trim()) {
      onSendMessage();
      // Reset height after sending message
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  // Voice Assistant: Speech to Text
  const handleStartListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      // Append transcript to the current message (multiline safe)
      setMessage(message ? message + "\n" + transcript : transcript);
      setIsListening(false);
      // Focus the textarea after speech
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Handle Attach click
  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // For now just log the file, or you can call a callback prop in future
      console.log('Attached file:', file);
      // Clear file input (so you can upload same file again if needed)
      e.target.value = '';
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex items-end gap-2 rounded-xl bg-zinc-100 p-2 outline outline-1 outline-neutral-200"
    >
      {/* Attach Icon */}
      <button
        type="button"
        aria-label="Attach file"
        className="flex items-center justify-center rounded-lg hover:bg-zinc-200 transition-colors p-2 text-blue-600"
        tabIndex={0}
        disabled={disabled}
        onClick={handleAttachClick}
      >
        <Paperclip size={22} />
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          tabIndex={-1}
          onChange={handleFileChange}
        />
      </button>

      {/* Textarea */}
      <div className="flex-1 flex items-center">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Ask to Multilingual..."
          disabled={disabled}
          rows={1}
          className="
            w-full resize-none bg-transparent border-none outline-none text-base font-normal text-neutral-700 font-['Poppins']
            disabled:opacity-50 p-2 min-h-[44px] max-h-40
            scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-zinc-100
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
            overflow-y-auto
          "
          style={{ lineHeight: '1.35' }}
          aria-label="Type your message"
        />
      </div>

      {/* Voice (Mic) Icon */}
      <button
        type="button"
        aria-label={
          isListening ? "Listening..." : "Start voice input"
        }
        title={
          isListening ? "Listening..." : "Voice Assistant"
        }
        className={`flex items-center justify-center rounded-lg transition-colors p-2 ${
          isListening ? 'bg-blue-100 text-blue-700 animate-pulse' : 'hover:bg-zinc-200 text-blue-600'
        }`}
        tabIndex={0}
        disabled={disabled || isListening}
        onClick={handleStartListening}
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

