
interface ConversationSectionProps {}

const ConversationSection = ({}: ConversationSectionProps) => {
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

  return (
    <div className="flex flex-col gap-6 pb-4">
      <div className="flex flex-col gap-3.5">
        <div className="flex justify-between items-center">
          <div className="text-black text-sm font-normal font-['Poppins']">
            Conversations
          </div>
          <button
            onClick={handleClearConversations}
            className="w-20 h-9 px-5 py-0.5 bg-gradient-to-b from-blue-700 to-sky-700 rounded-[5px] flex justify-between items-center overflow-hidden hover:opacity-90 transition-opacity"
          >
            <div className="text-stone-50 text-sm font-normal font-['Poppins']">
              Clear
            </div>
          </button>
        </div>
        
        <div className="px-2.5 py-3 bg-stone-50 rounded-2xl outline outline-1 outline-offset-[-1px] outline-stone-300/30 flex flex-col gap-2.5 overflow-hidden">
          <div className="flex flex-col">
            <div className="h-9 px-2.5 py-[5px] bg-gray-200 rounded-lg flex flex-col justify-center items-center gap-2.5 overflow-hidden group relative">
              <div className="w-full flex justify-between items-center">
                <div className="text-black text-sm font-normal font-['Poppins']">
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
                className="h-9 px-2.5 py-[5px] rounded-lg flex flex-col justify-center items-center gap-2.5 overflow-hidden hover:bg-gray-100 transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="w-full flex justify-between items-center">
                  <div className="text-black text-sm font-normal font-['Poppins']">
                    {item}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Last Week Section */}
      <div className="flex flex-col gap-3.5">
        <div className="flex justify-start items-center gap-32">
          <div className="text-black text-sm font-normal font-['Poppins']">
            Last Week
          </div>
        </div>
        <div className="px-2.5 py-3 bg-stone-50 rounded-2xl outline outline-1 outline-offset-[-1px] outline-stone-300/30 flex flex-col gap-2.5 overflow-hidden">
          <div className="flex flex-col">
            {lastWeekItems.map((item) => (
              <button
                key={item}
                className="h-9 px-2.5 py-[5px] rounded-lg flex flex-col justify-center items-center gap-2.5 overflow-hidden hover:bg-gray-100 transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="w-full flex justify-between items-center">
                  <div className="text-black text-sm font-normal font-['Poppins']">
                    {item}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Last Month Section */}
      <div className="flex flex-col gap-3.5">
        <div className="flex justify-start items-center gap-32">
          <div className="text-black text-sm font-normal font-['Poppins']">
            Last Month
          </div>
        </div>
        <div className="px-2.5 py-3 bg-stone-50 rounded-2xl outline outline-1 outline-offset-[-1px] outline-stone-300/30 flex flex-col gap-2.5 overflow-hidden">
          <div className="flex flex-col">
            {lastMonthItems.map((item) => (
              <button
                key={item}
                className="h-9 px-2.5 py-[5px] rounded-lg flex flex-col justify-center items-center gap-2.5 overflow-hidden hover:bg-gray-100 transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="w-full flex justify-between items-center">
                  <div className="text-black text-sm font-normal font-['Poppins']">
                    {item}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationSection;
