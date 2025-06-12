
const ChatHeader = () => {
  return (
    <div className="w-[1042px] inline-flex justify-between items-center">
      <div className="w-36 h-11 p-3.5 bg-gray-200 rounded-[10px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden hover:bg-gray-300 transition-colors">
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="justify-center text-black text-base font-normal font-['Poppins']">English</div>
          <div className="w-4 h-4 relative overflow-hidden">
            <svg className="w-4 h-4" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 1.25L6 5.75L10.5 1.25" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center gap-2.5">
        <div className="w-11 h-11 bg-gray-200 rounded-[35px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden hover:bg-gray-300 transition-colors cursor-pointer">
          <svg className="w-4 h-4" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.66666 14.3333C11.3486 14.3333 14.3333 11.3486 14.3333 7.66666C14.3333 3.98476 11.3486 1 7.66666 1C3.98476 1 1 3.98476 1 7.66666C1 11.3486 3.98476 14.3333 7.66666 14.3333Z" stroke="black" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 15.9999L12.375 12.3749" stroke="black" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="w-11 h-11 bg-gray-200 rounded-[35px] flex justify-center items-center gap-2.5 overflow-hidden hover:bg-gray-300 transition-colors cursor-pointer">
          <svg className="w-4 h-5" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 6.16823C13.5 4.84215 12.9732 3.57037 12.0355 2.63268C11.0979 1.695 9.82608 1.16821 8.5 1.16821C7.17392 1.16821 5.90215 1.695 4.96447 2.63268C4.02678 3.57037 3.5 4.84215 3.5 6.16823C3.5 12.0016 1 13.6683 1 13.6683H16C16 13.6683 13.5 12.0016 13.5 6.16823Z" stroke="black" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.94168 17.0015C9.79517 17.2541 9.58488 17.4638 9.33187 17.6095C9.07886 17.7552 8.792 17.8319 8.50002 17.8319C8.20803 17.8319 7.92117 17.7552 7.66816 17.6095C7.41515 17.4638 7.20486 17.2541 7.05835 17.0015" stroke="black" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <img className="w-11 h-11 rounded-full hover:scale-110 transition-transform cursor-pointer" src="https://placehold.co/45x45" />
      </div>
    </div>
  );
};

export default ChatHeader;
