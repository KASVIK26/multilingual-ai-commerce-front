
interface SidebarHeaderProps {}

const SidebarHeader = ({}: SidebarHeaderProps) => {
  return (
    <div className="self-stretch text-center justify-center text-violet-700 text-3xl font-bold font-['Poppins']"
      style={{
        background: 'linear-gradient(91deg, #3B00FE -4.68%, #991DCB 47.93%, #004998 99.54%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
      Multilingual AI
    </div>
  );
};

export default SidebarHeader;
