import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from 'lucide-react'; // Add this import at the top

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('Home');

  const menuItems = [
  { 
    name: 'Home', 
    icon: <img 
            src="/index_page/01 align center (1).svg" 
            alt="Home" 
            className="w-4 h-4"
          />, 
    path: '/dashboard' 
  },
  { 
    name: 'New Chat', 
    icon: <img 
            src="/index_page/01 align center (2).svg" 
            alt="New Chat" 
            className="w-4 h-4"
          />, 
    path: '/chat' 
  }
  ];

  const conversationItems = [
    'Shopping Chat Log',
    'About Payment Options',
    'Reorder Dettol Handwash',
    'Deals on Summer Collection'
  ];

  const lastWeekItems = [
    'Activate Voice Shopping',
    'Use Voice Assistant'
  ];

  const lastMonthItems = [
    'Last Grocery Order',
    'Help With Return Policy'
  ];

  const handleClearConversations = () => {
    console.log('Clearing conversations...');
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleMenuClick = (item: any) => {
    setActiveItem(item.name);
    navigate(item.path);
  };

  return (
    <div className="w-80 h-[984px] bg-stone-300/20 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-200 overflow-hidden relative">
      {/* Background gradients */}
      <div className="w-80 h-80 absolute left-[-191px] top-[-57px] opacity-75 bg-gradient-to-b from-violet-700 to-sky-400 rounded-full blur-[184.05px]" />
      <div className="w-80 h-80 absolute left-[132px] top-[867px] opacity-75 bg-gradient-to-b from-green-500 to-amber-300 rounded-full blur-[184.05px]" />
      
      <div className="w-72 absolute left-[21px] top-[20px] inline-flex flex-col justify-start items-center gap-9 relative z-10">
        <div className="self-stretch text-center justify-center text-violet-700 text-3xl font-bold font-['Poppins']"
          style={{
          background: 'linear-gradient(91deg, #3B00FE -4.68%, #991DCB 47.93%, #004998 99.54%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Multilingual AI
        </div>
        
        {/* Menu Items */}
        <div className="self-stretch flex flex-col justify-start items-start gap-3.5">
          {menuItems.map((item, index) => (
            <button
              key={item.name}
              onClick={() => handleMenuClick(item)}
              className={`self-stretch h-14 px-2.5 py-3.5 rounded-[10px] flex flex-col justify-center items-center gap-2.5 overflow-hidden transition-colors ${
                activeItem === item.name 
                  ? 'bg-blue-700'
                  : window.location.pathname === item.path
                  ? 'bg-blue-700'
                  : 'bg-gradient-to-r from-slate-950 to-blue-900'
              }`}
            >
              <div className="w-64 inline-flex justify-between items-center">
                <div className={`justify-center text-sm font-normal font-['Poppins'] ${
                  activeItem === item.name || window.location.pathname === item.path
                    ? 'text-stone-50'
                    : 'text-stone-50'
                }`}>
                  {item.name}
                </div>
                {item.icon}
              </div>
            </button>
          ))}
        </div>

        {/* Conversations Section */}
        <div className="self-stretch flex flex-col justify-start items-start gap-9">
          <div className="self-stretch flex flex-col justify-start items-start gap-3.5">
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="justify-center text-black text-sm font-normal font-['Poppins']">
                Conversations
              </div>
              <button
                onClick={handleClearConversations}
                className="w-20 h-9 px-5 py-0.5 bg-gradient-to-b from-blue-700 to-sky-700 rounded-[5px] flex justify-between items-center overflow-hidden hover:opacity-90 transition-opacity"
              >
                <div className="justify-center text-stone-50 text-sm font-normal font-['Poppins']">
                  Clear
                </div>
              </button>
            </div>
            
            <div className="self-stretch px-2.5 py-3 bg-stone-50 rounded-2xl outline outline-1 outline-offset-[-1px] outline-stone-300/30 flex flex-col justify-start items-start gap-2.5 overflow-hidden">
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch h-9 px-2.5 py-[5px] bg-gray-200 rounded-lg flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                  <div className="self-stretch inline-flex justify-between items-center">
                    <div className="justify-center text-black text-sm font-normal font-['Poppins']">
                      Shopping Chat Log
                    </div>
                    <div className="w-4 h-4 relative overflow-hidden">
                      <div className="w-[3px] h-[3px] left-0 top-[7.50px] absolute bg-slate-700" />
                      <div className="w-[3px] h-[3px] left-[7.50px] top-[7.50px] absolute bg-slate-700" />
                      <div className="w-[3px] h-[3px] left-[15px] top-[7.50px] absolute bg-slate-700" />
                    </div>
                  </div>
                </div>
                {conversationItems.slice(1).map((item) => (
                  <button
                    key={item}
                    className="self-stretch h-9 px-2.5 py-[5px] rounded-lg flex flex-col justify-center items-center gap-2.5 overflow-hidden hover:bg-gray-100 transition-colors"
                  >
                    <div className="self-stretch inline-flex justify-between items-center">
                      <div className="justify-center text-black text-sm font-normal font-['Poppins']">
                        {item}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Last Week Section */}
          <div className="self-stretch flex flex-col justify-start items-start gap-3.5">
            <div className="inline-flex justify-start items-center gap-32">
              <div className="justify-center text-black text-sm font-normal font-['Poppins']">
                Last Week
              </div>
            </div>
            <div className="self-stretch px-2.5 py-3 bg-stone-50 rounded-2xl outline outline-1 outline-offset-[-1px] outline-stone-300/30 flex flex-col justify-start items-start gap-2.5 overflow-hidden">
              <div className="self-stretch flex flex-col justify-start items-start">
                {lastWeekItems.map((item) => (
                  <button
                    key={item}
                    className="self-stretch h-9 px-2.5 py-[5px] rounded-lg flex flex-col justify-center items-center gap-2.5 overflow-hidden hover:bg-gray-100 transition-colors"
                  >
                    <div className="self-stretch inline-flex justify-between items-center">
                      <div className="justify-center text-black text-sm font-normal font-['Poppins']">
                        {item}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Last Month Section */}
          <div className="self-stretch flex flex-col justify-start items-start gap-3.5">
            <div className="inline-flex justify-start items-center gap-32">
              <div className="justify-center text-black text-sm font-normal font-['Poppins']">
                Last Month
              </div>
            </div>
            <div className="self-stretch px-2.5 py-3 bg-stone-50 rounded-2xl outline outline-1 outline-offset-[-1px] outline-stone-300/30 flex flex-col justify-start items-start gap-2.5 overflow-hidden">
              <div className="self-stretch flex flex-col justify-start items-start">
                {lastMonthItems.map((item) => (
                  <button
                    key={item}
                    className="self-stretch h-9 px-2.5 py-[5px] rounded-lg flex flex-col justify-center items-center gap-2.5 overflow-hidden hover:bg-gray-100 transition-colors"
                  >
                    <div className="self-stretch inline-flex justify-between items-center">
                      <div className="justify-center text-black text-sm font-normal font-['Poppins']">
                        {item}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Account Section */}
        {/* Account Section */}
        <div className="self-stretch px-2.5 py-3 bg-slate-950 rounded-2xl outline outline-1 outline-offset-[-1px] inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden">
          {/* My Account Button */}
          <div className="w-[268px] h-9 px-2.5 py-[5px] bg-gradient-to-r from-violet-700 via-purple-700 to-sky-800 rounded-[10px] flex flex-col justify-center items-center gap-2.5 overflow-hidden">
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="justify-center text-white text-sm font-normal font-['Poppins']">
                My Account
              </div>
              <img 
                src="/index_page/Group (1).svg" 
                alt="Account Icon" 
                className="w-4 h-4"
              />
            </div>
          </div>

          {/* Logout Button */}
          <div 
            className="w-[270px] h-9 px-2.5 py-[5px] rounded-[10px] flex flex-col justify-center items-center gap-2.5 overflow-hidden cursor-pointer hover:bg-white/5 transition-colors"
            onClick={handleLogout}
          >
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="justify-center text-stone-50 text-sm font-normal font-['Poppins']">
                Log Out
              </div>
              <img 
                src="/index_page/01 align center.svg" 
                alt="Logout Icon" 
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
