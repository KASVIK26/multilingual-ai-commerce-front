
import React from 'react';
import { Send, Mic, Paperclip } from 'lucide-react';

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: () => void;
  disabled?: boolean;
}

const ChatInput = ({ message, setMessage, onSendMessage, disabled }: ChatInputProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disabled) {
      onSendMessage();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!disabled) {
        onSendMessage();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="self-stretch inline-flex justify-center items-center gap-2.5">
      <button
        type="button"
        className="w-16 h-16 px-5 py-3.5 bg-zinc-100 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 flex justify-center items-center gap-2.5 overflow-hidden hover:bg-zinc-200 transition-colors cursor-pointer"
      >
        <svg className="w-6 h-6" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.80656 4.83043C9.55756 2.63256 12.5942 2.566 13.4846 4.63074L13.56 4.83169L14.5735 7.79568C14.8057 8.47542 15.1811 9.09746 15.6741 9.61981C16.1672 10.1422 16.7666 10.5527 17.4318 10.8237L17.7043 10.9254L20.6681 11.9377C22.8659 12.6888 22.9325 15.7256 20.8691 16.616L20.6681 16.6914L17.7043 17.7049C17.0244 17.9371 16.4021 18.3123 15.8796 18.8054C15.357 19.2986 14.9463 19.898 14.6752 20.5634L14.5735 20.8347L13.5612 23.7999C12.8102 25.9978 9.77357 26.0644 8.88442 24.0009L8.80656 23.7999L7.79433 20.836C7.56223 20.156 7.18697 19.5337 6.69388 19.0111C6.20079 18.4885 5.60135 18.0778 4.936 17.8067L4.66473 17.7049L1.70091 16.6927C-0.498102 15.9416 -0.564662 12.9048 1.49997 12.0156L1.70091 11.9377L4.66473 10.9254C5.34445 10.6932 5.96645 10.3178 6.48877 9.82471C7.0111 9.3316 7.42161 8.73221 7.69261 8.06696L7.79433 7.79568L8.80656 4.83043ZM21.2308 0.5C21.4657 0.5 21.696 0.565909 21.8953 0.690237C22.0947 0.814565 22.2552 0.992326 22.3585 1.20332L22.4188 1.35026L22.8584 2.63884L24.1481 3.07842C24.3836 3.15841 24.59 3.30651 24.7412 3.50394C24.8924 3.70138 24.9816 3.93925 24.9974 4.18743C25.0133 4.4356 24.9552 4.6829 24.8303 4.89799C24.7055 5.11307 24.5197 5.28626 24.2963 5.3956L24.1481 5.45589L22.8596 5.89546L22.4201 7.1853C22.3399 7.42069 22.1917 7.627 21.9942 7.77808C21.7967 7.92916 21.5588 8.01822 21.3107 8.03395C21.0625 8.04969 20.8153 7.9914 20.6003 7.86648C20.3853 7.74156 20.2122 7.55563 20.103 7.33224L20.0427 7.1853L19.6032 5.89672L18.3134 5.45714C18.078 5.37714 17.8716 5.22905 17.7204 5.03161C17.5692 4.83418 17.48 4.59631 17.4641 4.34813C17.4482 4.09996 17.5064 3.85266 17.6312 3.63757C17.756 3.42249 17.9419 3.2493 18.1652 3.13996L18.3134 3.07967L19.6019 2.6401L20.0415 1.35026C20.1262 1.10212 20.2864 0.886711 20.4997 0.734229C20.7129 0.581747 20.9686 0.499843 21.2308 0.5Z" fill="url(#paint0_linear_1_247)"/>
          <defs>
            <linearGradient id="paint0_linear_1_247" x1="12.5" y1="0.5" x2="12.5" y2="25.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#08479B"/>
              <stop offset="0.548077" stopColor="#4B05F6"/>
              <stop offset="1" stopColor="#971CCC"/>
            </linearGradient>
          </defs>
        </svg>
      </button>
      
      <div className="w-[856px] h-16 p-5 bg-zinc-100 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 flex justify-start items-center gap-2.5 overflow-hidden hover:bg-zinc-50 transition-colors">
        <div className="w-[816px] flex justify-between items-center">
          <div className="w-48 flex justify-start items-center gap-3.5">
            <Paperclip size={16} className="text-blue-600" />
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask to Multilingual..."
              disabled={disabled}
              className="bg-transparent text-neutral-500 text-base font-normal font-['Poppins'] outline-none flex-1 disabled:opacity-50"
            />
          </div>
          <div className="flex justify-start items-center gap-2.5">
            <Mic size={20} className="text-blue-600" />
          </div>
        </div>
      </div>
      
      <button 
        type="submit"
        disabled={disabled || !message.trim()}
        className="w-16 h-16 px-5 py-3.5 bg-zinc-100 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 flex justify-center items-center gap-2.5 overflow-hidden hover:bg-zinc-200 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send size={24} className="text-blue-600" />
      </button>
    </form>
  );
};

export default ChatInput;
