
import { useState } from 'react';
import SuggestedActions from './SuggestedActions';
import ChatInput from './ChatInput';

const ChatInterface = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="w-[1042px] left-[378px] top-[652px] absolute inline-flex flex-col justify-start items-center gap-10">
      <div className="self-stretch flex flex-col justify-start items-center gap-10">
        <SuggestedActions />
        <ChatInput 
          message={message}
          setMessage={setMessage}
          onSendMessage={handleSendMessage}
        />
      </div>
      <div className="self-stretch text-center justify-center text-neutral-500 text-xs font-light font-['Poppins']">
        Powered by Multilingual AI
      </div>
    </div>
  );
};

export default ChatInterface;
