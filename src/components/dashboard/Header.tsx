
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';

const Header = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
      
      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User';

  return (
    <div className="w-full inline-flex justify-between items-start">
      <div className="w-52 inline-flex flex-col justify-start items-start">
        <div className="self-stretch justify-center text-black text-2xl font-medium font-['Poppins']">
          Welcome {displayName}!
        </div>
        <div className="self-stretch justify-center text-neutral-500 text-base font-normal font-['Poppins']">
          How can we help you today?
        </div>
      </div>
      <div className="flex justify-start items-center gap-2.5">
        <form onSubmit={handleSearch} className="w-64 h-11 px-2.5 py-3 bg-gray-200 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-zinc-100 inline-flex flex-col justify-center items-start gap-2.5 overflow-hidden">
          <div className="self-stretch inline-flex justify-start items-center gap-2.5">
            <img 
              src="/index_page/Group 6.svg" 
              alt="Search" 
              className="w-3.5 h-3.5"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search here.."
              className="flex-1 bg-transparent text-xs font-normal font-['Poppins'] text-neutral-500 placeholder:text-neutral-500 outline-none"
            />
          </div>
        </form>
        <button className="w-11 h-11 bg-gray-200 rounded-[35px] flex justify-center items-center gap-2.5 overflow-hidden hover:bg-gray-300 transition-colors">
          <img 
            src="/index_page/Group 4.svg" 
            alt="Notifications" 
            className="w-3.5 h-3"
          />
        </button>
        {profile?.avatar_url ? (
          <img 
            className="w-11 h-11 rounded-full cursor-pointer hover:scale-105 transition-transform object-cover" 
            src={profile.avatar_url} 
            alt="Profile"
          />
        ) : (
          <div className="w-11 h-11 rounded-full cursor-pointer hover:scale-105 transition-transform bg-blue-500 flex items-center justify-center text-white font-medium">
            {displayName.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
