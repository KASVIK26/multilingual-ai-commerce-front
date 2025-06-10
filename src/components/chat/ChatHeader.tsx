
import { useState } from 'react';

const ChatHeader = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  return (
    <div className="w-full inline-flex justify-between items-center">
      <div className="w-36 h-11 p-3.5 bg-gray-200 rounded-[10px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden cursor-pointer">
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="justify-center text-black text-base font-normal font-['Poppins']">{selectedLanguage}</div>
          <div className="w-4 h-4 relative overflow-hidden">
            <div className="w-2 h-1 left-[4.50px] top-[6.75px] absolute outline outline-2 outline-offset-[-1px] outline-black" />
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center gap-2.5">
        <button className="w-11 h-11 bg-gray-200 rounded-[35px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden hover:bg-gray-300 transition-colors">
          <div className="w-3.5 h-3 outline outline-[1.40px] outline-offset-[-0.70px] outline-black" />
        </button>
        <button className="w-11 h-11 bg-gray-200 rounded-[35px] flex justify-center items-center gap-2.5 overflow-hidden hover:bg-gray-300 transition-colors">
          <div className="w-3.5 h-[5px] outline outline-[1.40px] outline-offset-[-0.70px] outline-black" />
          <div className="w-2 h-1 outline outline-[1.40px] outline-offset-[-0.70px] outline-black" />
          <div className="w-0 h-2.5 outline outline-[1.40px] outline-offset-[-0.70px] outline-black" />
        </button>
        <img 
          className="w-11 h-11 rounded-full cursor-pointer hover:scale-105 transition-transform" 
          src="/lovable-uploads/4611ef25-3afc-4fab-878a-73148d92d35d.png" 
          alt="Profile"
        />
      </div>
    </div>
  );
};

export default ChatHeader;
