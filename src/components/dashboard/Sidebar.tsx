
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarHeader from './sidebar/SidebarHeader';
import SidebarMenu from './sidebar/SidebarMenu';
import ConversationSection from './sidebar/ConversationSection';
import AccountSection from './sidebar/AccountSection';

const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('Home');

  // Update active item based on current route
  useEffect(() => {
    if (location.pathname === '/dashboard') {
      setActiveItem('Home');
    } else if (location.pathname === '/chat') {
      setActiveItem('New Chat');
    }
  }, [location.pathname]);

  return (
    <div className="w-full h-full bg-stone-300/20 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-200 overflow-hidden relative flex flex-col">
      {/* Background gradients */}
      <div className="w-64 h-64 absolute left-[-120px] top-[-40px] opacity-75 bg-gradient-to-b from-violet-700 to-sky-400 rounded-full blur-[120px]" />
      <div className="w-64 h-64 absolute left-[80px] bottom-[-40px] opacity-75 bg-gradient-to-b from-green-500 to-amber-300 rounded-full blur-[120px]" />
      
      {/* Scrollable content wrapper with hidden scrollbars */}
      <div className="flex-1 flex flex-col relative z-10 overflow-y-auto overflow-x-hidden scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex flex-col gap-4 p-4 min-h-full w-full">
          <div className="flex-shrink-0 w-full">
            <SidebarHeader />
          </div>
          
          <div className="flex-shrink-0 w-full">
            <SidebarMenu activeItem={activeItem} setActiveItem={setActiveItem} />
          </div>

          <div className="flex-1 min-h-0 overflow-hidden w-full">
            <ConversationSection />
          </div>

          <div className="flex-shrink-0 mt-auto w-full">
            <AccountSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
