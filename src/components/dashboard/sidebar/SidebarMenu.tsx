
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface MenuItem {
  name: string;
  icon: JSX.Element;
  path: string;
}

interface SidebarMenuProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const SidebarMenu = ({ activeItem, setActiveItem }: SidebarMenuProps) => {
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    { 
      name: 'Home', 
      icon: (
        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.25 8.25H0V2.25C0 1.65326 0.237053 1.08097 0.65901 0.65901C1.08097 0.237053 1.65326 0 2.25 0L8.25 0V8.25ZM1.5 6.75H6.75V1.5H2.25C2.05109 1.5 1.86032 1.57902 1.71967 1.71967C1.57902 1.86032 1.5 2.05109 1.5 2.25V6.75Z" fill="currentColor"/>
          <path d="M17.9999 8.25H9.74988V0H15.7499C16.3466 0 16.9189 0.237053 17.3409 0.65901C17.7628 1.08097 17.9999 1.65326 17.9999 2.25V8.25ZM11.2499 6.75H16.4999V2.25C16.4999 2.05109 16.4209 1.86032 16.2802 1.71967C16.1395 1.57902 15.9488 1.5 15.7499 1.5H11.2499V6.75Z" fill="currentColor"/>
          <path d="M8.25 18H2.25C1.65326 18 1.08097 17.7629 0.65901 17.341C0.237053 16.919 0 16.3467 0 15.75L0 9.74998H8.25V18ZM1.5 11.25V15.75C1.5 15.9489 1.57902 16.1397 1.71967 16.2803C1.86032 16.421 2.05109 16.5 2.25 16.5H6.75V11.25H1.5Z" fill="currentColor"/>
          <path d="M15.7499 18H9.74988V9.74998H17.9999V15.75C17.9999 16.3467 17.7628 16.919 17.3409 17.341C16.9189 17.7629 16.3466 18 15.7499 18ZM11.2499 16.5H15.7499C15.9488 16.5 16.1395 16.421 16.2802 16.2803C16.4209 16.1397 16.4999 15.9489 16.4999 15.75V11.25H11.2499V16.5Z" fill="currentColor"/>
        </svg>
      ), 
      path: '/dashboard' 
    },
    { 
      name: 'New Chat', 
      icon: (
        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.75012 14.2498H7.06062L17.2929 4.01756C17.7312 3.57819 17.9773 2.98292 17.9773 2.36231C17.9773 1.7417 17.7312 1.14643 17.2929 0.70706C16.8471 0.280981 16.2542 0.0431976 15.6376 0.0431976C15.021 0.0431976 14.4281 0.280981 13.9824 0.70706L3.75012 10.9393V14.2498ZM5.25012 11.5603L15.0429 1.76756C15.2031 1.61453 15.4161 1.52913 15.6376 1.52913C15.8592 1.52913 16.0722 1.61453 16.2324 1.76756C16.3898 1.92545 16.4783 2.13933 16.4783 2.36231C16.4783 2.58529 16.3898 2.79917 16.2324 2.95706L6.43962 12.7498H5.25012V11.5603Z" fill="currentColor"/>
          <path d="M17.7157 5.7165L16.5 6.93225V12H12V16.5H1.5V2.25C1.5 2.05109 1.57902 1.86032 1.71967 1.71967C1.86032 1.57902 2.05109 1.5 2.25 1.5H11.0685L12.2843 0.28425C12.3938 0.182718 12.5092 0.0877996 12.63 0L2.25 0C1.65326 0 1.08097 0.237053 0.65901 0.65901C0.237053 1.08097 0 1.65326 0 2.25L0 18H13.8105L18 13.8105V5.37075C17.912 5.4914 17.8171 5.60684 17.7157 5.7165ZM13.5 16.1895V13.5H16.1895L13.5 16.1895Z" fill="currentColor"/>
        </svg>
      ), 
      path: '/chat' 
    }
  ];

  const handleMenuClick = (item: MenuItem) => {
    setActiveItem(item.name);
    navigate(item.path);
  };

  return (
    <div className="self-stretch flex flex-col justify-start items-start gap-3">
      {menuItems.map((item) => (
        <button
          key={item.name}
          onClick={() => handleMenuClick(item)}
          className={`w-full h-12 px-3 py-2 rounded-[10px] flex items-center gap-2 overflow-hidden transition-all duration-300 hover:scale-105 ${
            activeItem === item.name
              ? 'bg-blue-700 text-stone-50'
              : 'bg-gradient-to-r from-slate-950 to-blue-900 text-stone-50 hover:bg-blue-600'
          }`}
        >
          <div className="w-full inline-flex justify-between items-center min-w-0">
            <div className="justify-center text-sm font-normal font-['Poppins'] truncate flex-1">
              {item.name}
            </div>
            {item.icon}
          </div>
        </button>
      ))}
    </div>
  );
};

export default SidebarMenu;
