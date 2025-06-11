import { useState } from 'react';

const ChatHeader = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  return (
    <div className="w-full inline-flex justify-between items-center">
      <div className="w-36 h-11 p-3.5 bg-gray-200 rounded-[10px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden cursor-pointer">
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="justify-center text-black text-base font-normal font-['Poppins']">{selectedLanguage}</div>
          <div className="w-4 h-4 relative overflow-hidden">
            <img 
              src="/index_page/Vector (1).svg"
              alt="Dropdown"
              className="w-4 h-4"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center gap-2.5">
        <button className="w-11 h-11 bg-gray-200 rounded-[35px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden hover:bg-gray-300 transition-colors">
          <div className="w-4 h-4 relative overflow-hidden">
            <img 
              src="/index_page/Vector (2).svg"
              alt="Dropdown"
              className="w-4 h-4"
            />
          </div>
        </button>
        <button className="w-11 h-11 bg-gray-200 rounded-[35px] flex justify-center items-center gap-2.5 overflow-hidden hover:bg-gray-300 transition-colors">
          <div className="w-4 h-4 relative overflow-hidden">
            <img 
              src="/index_page/Group 3.svg"
              alt="Settings"
              className="w-4 h-4"
            />
          </div>
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
