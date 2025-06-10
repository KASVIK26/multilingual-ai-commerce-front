
const SuggestedActions = () => {
  const actions = [
    {
      title: "Explore New Deals",
      subtitle: "Find discounts on today's top-rated products",
      variant: "gradient"
    },
    {
      title: "Track My Orders",
      subtitle: "Check delivery status or view order history",
      variant: "white"
    },
    {
      title: "Reorder Items",
      subtitle: "Quickly restock your regular buys",
      variant: "white"
    },
    {
      title: "Talk to a Human",
      subtitle: "Connect with a live support agent instantly",
      variant: "white"
    }
  ];

  const handleActionClick = (title: string) => {
    console.log('Action clicked:', title);
  };

  return (
    <div className="w-[691px] flex flex-col justify-start items-center gap-7">
      <div className="self-stretch inline-flex justify-start items-center gap-7">
        <button 
          onClick={() => handleActionClick(actions[0].title)}
          className="w-80 h-20 p-5 bg-gradient-to-br from-violet-700/20 via-yellow-400/30 to-green-500/20 rounded-2xl outline outline-1 outline-offset-[-1px] outline-violet-700/20 inline-flex flex-col justify-center items-end gap-2.5 overflow-hidden hover:scale-105 transition-transform"
        >
          <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
            <div className="self-stretch justify-center text-black text-base font-normal font-['Poppins']">
              {actions[0].title}
            </div>
            <div className="self-stretch justify-center text-neutral-500 text-xs font-normal font-['Poppins']">
              {actions[0].subtitle}
            </div>
          </div>
        </button>
        <button 
          onClick={() => handleActionClick(actions[1].title)}
          className="w-80 h-20 p-5 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-neutral-300 inline-flex flex-col justify-center items-end gap-2.5 overflow-hidden hover:scale-105 transition-transform"
        >
          <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
            <div className="self-stretch justify-center text-black text-base font-normal font-['Poppins']">
              {actions[1].title}
            </div>
            <div className="self-stretch justify-center text-neutral-500 text-xs font-normal font-['Poppins']">
              {actions[1].subtitle}
            </div>
          </div>
        </button>
      </div>
      <div className="self-stretch inline-flex justify-start items-center gap-7">
        <button 
          onClick={() => handleActionClick(actions[2].title)}
          className="w-80 h-20 p-5 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-neutral-300 inline-flex flex-col justify-center items-end gap-2.5 overflow-hidden hover:scale-105 transition-transform"
        >
          <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
            <div className="self-stretch justify-center text-black text-base font-normal font-['Poppins']">
              {actions[2].title}
            </div>
            <div className="self-stretch justify-center text-neutral-500 text-xs font-normal font-['Poppins']">
              {actions[2].subtitle}
            </div>
          </div>
        </button>
        <button 
          onClick={() => handleActionClick(actions[3].title)}
          className="w-80 h-20 p-5 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-neutral-300 inline-flex flex-col justify-center items-end gap-2.5 overflow-hidden hover:scale-105 transition-transform"
        >
          <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
            <div className="self-stretch justify-center text-black text-base font-normal font-['Poppins']">
              {actions[3].title}
            </div>
            <div className="self-stretch justify-center text-neutral-500 text-xs font-normal font-['Poppins']">
              {actions[3].subtitle}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SuggestedActions;
