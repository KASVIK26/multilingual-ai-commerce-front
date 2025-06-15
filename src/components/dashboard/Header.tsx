
import { useState } from 'react';
import { Search, Bell } from 'lucide-react';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="w-full flex justify-between items-start gap-4">
      <div className="flex-1 min-w-0 max-w-xs lg:max-w-md">
        <div className="text-black text-2xl font-medium font-['Poppins'] truncate">
          Welcome Alex!
        </div>
        <div className="text-neutral-500 text-base font-normal font-['Poppins'] truncate">
          How can we help you today?
        </div>
      </div>
      
      <div className="flex justify-start items-center gap-2.5 flex-shrink-0">
        <form onSubmit={handleSearch} className="w-48 sm:w-56 lg:w-64 h-11 px-2.5 py-3 bg-gray-200 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-zinc-100 flex items-center gap-2.5 overflow-hidden">
          <Search className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search here.."
            className="flex-1 bg-transparent text-xs font-normal font-['Poppins'] text-neutral-500 placeholder:text-neutral-500 outline-none min-w-0"
          />
        </form>
        
        <button className="w-11 h-11 bg-gray-200 rounded-[35px] flex justify-center items-center gap-2.5 overflow-hidden hover:bg-gray-300 transition-colors flex-shrink-0">
          <Bell className="w-3.5 h-3 text-neutral-600" />
        </button>
        
        <img 
          className="w-11 h-11 rounded-full cursor-pointer hover:scale-105 transition-transform flex-shrink-0" 
          src="/lovable-uploads/4611ef25-3afc-4fab-878a-73148d92d35d.png" 
          alt="Profile"
        />
      </div>
    </div>
  );
};

export default Header;
