
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
        <div className="w-6 h-6 bg-gradient-to-b from-sky-800 via-violet-700 to-purple-700" />
      </button>
      
      <div className="w-[856px] h-16 p-5 bg-zinc-100 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 flex justify-start items-center gap-2.5 overflow-hidden">
        <div className="w-[816px] flex justify-between items-center">
          <div className="w-48 flex justify-start items-center gap-3.5">
            <div className="w-6 h-6 relative overflow-hidden">
              <div className="w-5 h-5 left-[2.08px] top-[1.45px] absolute outline outline-2 outline-offset-[-1px] outline-black" />
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
              className="w-4 h-2.5 outline outline-2 outline-offset-[-1px] outline-blue-700 hover:bg-blue-700 transition-colors"
            />
            <button className="w-5 h-7 outline outline-2 outline-offset-[-1px] outline-blue-700 hover:bg-blue-700 transition-colors" />
          </div>
        </div>
      </div>
      
      <button className="w-16 h-16 px-5 py-3.5 bg-zinc-100 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 flex justify-center items-center gap-2.5 overflow-hidden hover:bg-zinc-200 transition-colors">
        <div className="w-2 h-4 bg-black outline outline-[2.50px] outline-offset-[-1.25px] outline-black" />
        <div className="w-4 h-3 outline outline-[2.50px] outline-offset-[-1.25px] outline-black" />
        <div className="w-0 h-[5.14px] outline outline-[2.50px] outline-offset-[-1.25px] outline-black" />
        <div className="w-2.5 h-0 outline outline-[2.50px] outline-offset-[-1.25px] outline-black" />
      </button>
    </div>
  );
};

export default ChatInput;
