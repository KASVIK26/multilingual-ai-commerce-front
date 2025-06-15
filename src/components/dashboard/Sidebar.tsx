
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
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

  const menuItems = [
    { 
      name: 'Home', 
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <svg className="w-4 h-4" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.75012 14.2498H7.06062L17.2929 4.01756C17.7312 3.57819 17.9773 2.98292 17.9773 2.36231C17.9773 1.7417 17.7312 1.14643 17.2929 0.70706C16.8471 0.280981 16.2542 0.0431976 15.6376 0.0431976C15.021 0.0431976 14.4281 0.280981 13.9824 0.70706L3.75012 10.9393V14.2498ZM5.25012 11.5603L15.0429 1.76756C15.2031 1.61453 15.4161 1.52913 15.6376 1.52913C15.8592 1.52913 16.0722 1.61453 16.2324 1.76756C16.3898 1.92545 16.4783 2.13933 16.4783 2.36231C16.4783 2.58529 16.3898 2.79917 16.2324 2.95706L6.43962 12.7498H5.25012V11.5603Z" fill="currentColor"/>
          <path d="M17.7157 5.7165L16.5 6.93225V12H12V16.5H1.5V2.25C1.5 2.05109 1.57902 1.86032 1.71967 1.71967C1.86032 1.57902 2.05109 1.5 2.25 1.5H11.0685L12.2843 0.28425C12.3938 0.182718 12.5092 0.0877996 12.63 0L2.25 0C1.65326 0 1.08097 0.237053 0.65901 0.65901C0.237053 1.08097 0 1.65326 0 2.25L0 18H13.8105L18 13.8105V5.37075C17.912 5.4914 17.8171 5.60684 17.7157 5.7165ZM13.5 16.1895V13.5H16.1895L13.5 16.1895Z" fill="currentColor"/>
        </svg>
      ), 
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
    <div className="w-80 h-screen bg-stone-300/20 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-200 overflow-hidden relative">
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
      
      <div className="w-72 absolute left-[21px] top-[20px] h-[calc(100vh-40px)] overflow-y-auto sidebar-scroll inline-flex flex-col justify-start items-center gap-9 relative z-10">
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
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleMenuClick(item)}
              className={`self-stretch h-14 px-2.5 py-3.5 rounded-[10px] flex flex-col justify-center items-center gap-2.5 overflow-hidden transition-all duration-300 hover:scale-105 ${
                activeItem === item.name
                  ? 'bg-blue-700 text-stone-50'
                  : 'bg-gradient-to-r from-slate-950 to-blue-900 text-stone-50 hover:bg-blue-600'
              }`}
            >
              <div className="w-64 inline-flex justify-between items-center">
                <div className="justify-center text-sm font-normal font-['Poppins']">
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
                <div className="self-stretch h-9 px-2.5 py-[5px] bg-gray-200 rounded-lg flex flex-col justify-center items-center gap-2.5 overflow-hidden group relative">
                  <div className="self-stretch inline-flex justify-between items-center">
                    <div className="justify-center text-black text-sm font-normal font-['Poppins']">
                      Shopping Chat Log
                    </div>
                    <div className="w-4 h-4 relative overflow-hidden">
                      <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 18 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 3.00024C2.32843 3.00024 3 2.32867 3 1.50024C3 0.671816 2.32843 0.000244141 1.5 0.000244141C0.671573 0.000244141 0 0.671816 0 1.50024C0 2.32867 0.671573 3.00024 1.5 3.00024Z" fill="currentColor"/>
                        <path d="M9 3.00024C9.82842 3.00024 10.5 2.32867 10.5 1.50024C10.5 0.671816 9.82842 0.000244141 9 0.000244141C8.17157 0.000244141 7.5 0.671816 7.5 1.50024C7.5 2.32867 8.17157 3.00024 9 3.00024Z" fill="currentColor"/>
                        <path d="M16.5002 3.00024C17.3287 3.00024 18.0002 2.32867 18.0002 1.50024C18.0002 0.671816 17.3287 0.000244141 16.5002 0.000244141C15.6718 0.000244141 15.0002 0.671816 15.0002 1.50024C15.0002 2.32867 15.6718 3.00024 16.5002 3.00024Z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                </div>
                {conversationItems.slice(1).map((item) => (
                  <button
                    key={item}
                    className="self-stretch h-9 px-2.5 py-[5px] rounded-lg flex flex-col justify-center items-center gap-2.5 overflow-hidden hover:bg-gray-100 transition-all duration-200 hover:scale-[1.02]"
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
                    className="self-stretch h-9 px-2.5 py-[5px] rounded-lg flex flex-col justify-center items-center gap-2.5 overflow-hidden hover:bg-gray-100 transition-all duration-200 hover:scale-[1.02]"
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
                    className="self-stretch h-9 px-2.5 py-[5px] rounded-lg flex flex-col justify-center items-center gap-2.5 overflow-hidden hover:bg-gray-100 transition-all duration-200 hover:scale-[1.02]"
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
        <div className="self-stretch px-2.5 py-3 bg-slate-950 rounded-2xl outline outline-1 outline-offset-[-1px] inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden">
          {/* My Account Button */}
          <div className="w-[268px] h-9 px-2.5 py-[5px] bg-gradient-to-r from-violet-700 via-purple-700 to-sky-800 rounded-[10px] flex flex-col justify-center items-center gap-2.5 overflow-hidden hover:scale-105 transition-transform duration-200">
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="justify-center text-white text-sm font-normal font-['Poppins']">
                My Account
              </div>
              <svg className="w-4 h-4" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 1.5C5.0293 1.5 1 5.5293 1 10.5C1 15.4707 5.0293 19.5 10 19.5C14.9707 19.5 19 15.4707 19 10.5C19 5.5293 14.9707 1.5 10 1.5Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.04395 16.2114C3.04395 16.2114 5.05005 13.65 10 13.65C14.95 13.65 16.957 16.2114 16.957 16.2114M10 10.5C10.7161 10.5 11.4029 10.2155 11.9092 9.70916C12.4156 9.20282 12.7 8.51606 12.7 7.79998C12.7 7.08389 12.4156 6.39714 11.9092 5.89079C11.4029 5.38444 10.7161 5.09998 10 5.09998C9.28396 5.09998 8.5972 5.38444 8.09086 5.89079C7.58451 6.39714 7.30005 7.08389 7.30005 7.79998C7.30005 8.51606 7.58451 9.20282 8.09086 9.70916C8.5972 10.2155 9.28396 10.5 10 10.5Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Logout Button */}
          <div 
            className="w-[270px] h-9 px-2.5 py-[5px] rounded-[10px] flex flex-col justify-center items-center gap-2.5 overflow-hidden cursor-pointer hover:bg-white/5 transition-all duration-200 hover:scale-105"
            onClick={handleLogout}
          >
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="justify-center text-stone-50 text-sm font-normal font-['Poppins']">
                Log Out
              </div>
              <svg className="w-4 h-4" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 16.25V2.75C1.5 2.55109 1.57902 2.36032 1.71967 2.21967C1.86032 2.07902 2.05109 2 2.25 2H6V0.5H2.25C1.65326 0.5 1.08097 0.737053 0.65901 1.15901C0.237053 1.58097 0 2.15326 0 2.75L0 16.25C0 16.8467 0.237053 17.419 0.65901 17.841C1.08097 18.2629 1.65326 18.5 2.25 18.5H6V17H2.25C2.05109 17 1.86032 16.921 1.71967 16.7803C1.57902 16.6397 1.5 16.4489 1.5 16.25Z" fill="currentColor"/>
                <path d="M17.342 7.9088L13.9025 4.4693L12.842 5.5298L16.04 8.7278L3.74976 8.74955V10.2495L16.082 10.2278L12.8405 13.4693L13.901 14.5298L17.3405 11.0903C17.7625 10.6686 17.9997 10.0965 18 9.49986C18.0003 8.90324 17.7636 8.33094 17.342 7.9088Z" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
