
import { useNavigate } from 'react-router-dom';

interface AccountSectionProps {}

const AccountSection = ({}: AccountSectionProps) => {
  const navigate = useNavigate();

  const handleMyAccount = () => {
    navigate('/my-account');
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="w-full px-2 py-2 bg-slate-950 rounded-2xl outline outline-1 outline-offset-[-1px] inline-flex flex-col justify-start items-start gap-2 overflow-hidden">
      {/* My Account Button */}
      <div 
        className="w-full h-8 px-2 py-1 bg-gradient-to-r from-violet-700 via-purple-700 to-sky-800 rounded-[10px] flex items-center gap-2 overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer"
        onClick={handleMyAccount}
      >
        <div className="w-full inline-flex justify-between items-center min-w-0">
          <div className="justify-center text-white text-sm font-normal font-['Poppins'] truncate flex-1">
            My Account
          </div>
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 1.5C5.0293 1.5 1 5.5293 1 10.5C1 15.4707 5.0293 19.5 10 19.5C14.9707 19.5 19 15.4707 19 10.5C19 5.5293 14.9707 1.5 10 1.5Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.04395 16.2114C3.04395 16.2114 5.05005 13.65 10 13.65C14.95 13.65 16.957 16.2114 16.957 16.2114M10 10.5C10.7161 10.5 11.4029 10.2155 11.9092 9.70916C12.4156 9.20282 12.7 8.51606 12.7 7.79998C12.7 7.08389 12.4156 6.39714 11.9092 5.89079C11.4029 5.38444 10.7161 5.09998 10 5.09998C9.28396 5.09998 8.5972 5.38444 8.09086 5.89079C7.58451 6.39714 7.30005 7.08389 7.30005 7.79998C7.30005 8.51606 7.58451 9.20282 8.09086 9.70916C8.5972 10.2155 9.28396 10.5 10 10.5Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Logout Button */}
      <div 
        className="w-full h-8 px-2 py-1 rounded-[10px] flex items-center gap-2 overflow-hidden cursor-pointer hover:bg-white/5 transition-all duration-200 hover:scale-105"
        onClick={handleLogout}
      >
        <div className="w-full inline-flex justify-between items-center min-w-0">
          <div className="justify-center text-stone-50 text-sm font-normal font-['Poppins'] truncate flex-1">
            Log Out
          </div>
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 16.25V2.75C1.5 2.55109 1.57902 2.36032 1.71967 2.21967C1.86032 2.07902 2.05109 2 2.25 2H6V0.5H2.25C1.65326 0.5 1.08097 0.737053 0.65901 1.15901C0.237053 1.58097 0 2.15326 0 2.75L0 16.25C0 16.8467 0.237053 17.419 0.65901 17.841C1.08097 18.2629 1.65326 18.5 2.25 18.5H6V17H2.25C2.05109 17 1.86032 16.921 1.71967 16.7803C1.57902 16.6397 1.5 16.4489 1.5 16.25Z" fill="currentColor"/>
            <path d="M17.342 7.9088L13.9025 4.4693L12.842 5.5298L16.04 8.7278L3.74976 8.74955V10.2495L16.082 10.2278L12.8405 13.4693L13.901 14.5298L17.3405 11.0903C17.7625 10.6686 17.9997 10.0965 18 9.49986C18.0003 8.90324 17.7636 8.33094 17.342 7.9088Z" fill="currentColor"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AccountSection;
