
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
    <div className="w-96 h-screen bg-stone-300/20 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-200 overflow-hidden relative flex-shrink-0">
      <style>
        {`
          .sidebar-scroll::-webkit-scrollbar {
            display: none;
          }
          .sidebar-scroll {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
        `}
      </style>

      {/* Background gradients */}
      <div className="w-80 h-80 absolute left-[-191px] top-[-57px] opacity-75 bg-gradient-to-b from-violet-700 to-sky-400 rounded-full blur-[184.05px]" />
      <div className="w-80 h-80 absolute left-[132px] top-[867px] opacity-75 bg-gradient-to-b from-green-500 to-amber-300 rounded-full blur-[184.05px]" />
      
      <div className="w-80 mx-auto h-full overflow-y-auto sidebar-scroll flex flex-col gap-6 relative z-10 py-5 px-4">
        <SidebarHeader />
        
        <SidebarMenu activeItem={activeItem} setActiveItem={setActiveItem} />

        <div className="flex-1 min-h-0 overflow-y-auto sidebar-scroll">
          <ConversationSection />
        </div>

        <div className="flex-shrink-0">
          <AccountSection />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
