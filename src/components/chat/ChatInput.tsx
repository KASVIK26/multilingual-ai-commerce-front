interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: () => void;
}

const ChatInput = ({ message, setMessage, onSendMessage }: ChatInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="self-stretch inline-flex justify-center items-center gap-2.5">
      <button className="w-16 h-16 px-5 py-3.5 bg-zinc-100 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 flex justify-center items-center gap-2.5 overflow-hidden hover:bg-zinc-200 transition-colors">
        <div className="w-6 h-6 relative overflow-hidden">
          <img 
            src="/index_page/Vector (3).svg"
            alt="Dropdown"
            className="w-6 h-6"
          />
        </div>
      </button>
      
      <div className="w-[856px] h-16 p-5 bg-zinc-100 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 flex justify-start items-center gap-2.5 overflow-hidden">
        <div className="w-[816px] flex justify-between items-center">
          <div className="flex-1 flex justify-start items-center gap-3.5">
            <div className="w-6 h-6 relative overflow-hidden flex-shrink-0">
              <img 
                src="/index_page/paperclip.svg"
                alt="Attach"
                className="w-6 h-6"
              />
            </div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask to Multilingual..."
              className="flex-1 bg-transparent text-base font-normal font-['Poppins'] text-black placeholder:text-neutral-500 outline-none"
            />
          </div>
          <div className="flex justify-start items-center gap-2.5">
            <button 
              onClick={onSendMessage}
              className="w-8 h-8 relative overflow-hidden hover:scale-110 active:scale-95 transition-transform duration-150 ease-in-out"
            >
              <img 
                src="/index_page/Group 1.svg"
                alt="Send"
                className="w-8 h-8"
              />
            </button>
          </div>
        </div>
      </div>
      
      <button className="w-16 h-16 px-5 py-3.5 bg-zinc-100 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 flex justify-center items-center gap-2.5 overflow-hidden hover:bg-zinc-200 transition-colors">
        <div className="w-8 h-8 relative overflow-hidden">
          <img 
            src="/index_page/Group 2.svg"
            alt="Dropdown"
            className="w-8 h-8"
          />
        </div>
      </button>
    </div>
  );
};

export default ChatInput;
