
import { useState } from 'react';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="w-[1042px] inline-flex justify-between items-start">
      <div className="w-52 inline-flex flex-col justify-start items-start">
        <div className="self-stretch justify-center text-black text-2xl font-medium font-['Poppins']">
          Welcome Alex!
        </div>
        <div className="self-stretch justify-center text-neutral-500 text-base font-normal font-['Poppins']">
          How can we help you today?
        </div>
      </div>
      <div className="flex justify-start items-center gap-2.5">
        <form onSubmit={handleSearch} className="w-64 h-11 px-2.5 py-3 bg-gray-200 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-zinc-100 inline-flex flex-col justify-center items-start gap-2.5 overflow-hidden">
          <div className="self-stretch inline-flex justify-start items-center gap-2.5">
            <div className="w-3.5 h-3.5 outline outline-[1.40px] outline-offset-[-0.70px] outline-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search here.."
              className="flex-1 bg-transparent text-xs font-normal font-['Poppins'] text-neutral-500 placeholder:text-neutral-500 outline-none"
            />
          </div>
        </form>
        <button className="w-11 h-11 bg-gray-200 rounded-[35px] flex justify-center items-center gap-2.5 overflow-hidden hover:bg-gray-300 transition-colors">
          <div className="w-3.5 h-3 outline outline-[1.40px] outline-offset-[-0.70px] outline-black" />
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

export default Header;
