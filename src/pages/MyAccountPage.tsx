
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Camera, Save, ArrowLeft, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import Sidebar from '@/components/dashboard/Sidebar';
import { useUserProfile } from '@/hooks/useUserProfile';

// Avatar options with modern, diverse professional avatars
const avatarOptions = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format&q=80', // Professional man
  'https://images.unsplash.com/photo-1494790108755-2616b5ff7cd9?w=200&h=200&fit=crop&crop=face&auto=format&q=80', // Professional woman
  'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=200&h=200&fit=crop&crop=face&auto=format&q=80', // Modern man
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face&auto=format&q=80', // Modern woman
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face&auto=format&q=80', // Business professional
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face&auto=format&q=80', // Young professional
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face&auto=format&q=80', // Confident professional
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face&auto=format&q=80', // Modern businesswoman
];

const MyAccountPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { refreshProfile } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    username: '',
    avatar_url: '',
    timezone: 'UTC',
    language_preference: 'en'
  });
  const [formData, setFormData] = useState(profileData);

  // Load user profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.id) return;

      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error loading profile:', error);
          return;
        }

        if (data) {
          const loadedData = {
            first_name: data.first_name || '',
            last_name: data.last_name || '',
            email: data.email || user.email,
            phone: data.phone || '',
            username: data.username || '',
            avatar_url: data.avatar_url || '',
            timezone: data.timezone || 'UTC',
            language_preference: data.language_preference || 'en'
          };
          setProfileData(loadedData);
          setFormData(loadedData);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadProfile();
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarSelect = (avatarUrl: string) => {
    setFormData(prev => ({ ...prev, avatar_url: avatarUrl }));
    setShowAvatarSelector(false);
  };

  const handleSave = async () => {
    if (!user?.id) return;

    try {
      setIsSaving(true);
      
      const { error } = await supabase
        .from('user_profiles')
        .update(formData)
        .eq('id', user.id);
      
      if (error) {
        throw error;
      }
      
      setProfileData(formData);
      setIsEditing(false);
      
      // Refresh the profile data in the hook
      await refreshProfile();
      
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
      
      console.log('Profile updated:', formData);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
    setShowAvatarSelector(false);
  };

  const getDisplayName = () => {
    if (profileData.first_name || profileData.last_name) {
      return `${profileData.first_name} ${profileData.last_name}`.trim();
    }
    return profileData.username || profileData.email || 'User';
  };

  const getInitials = () => {
    const name = getDisplayName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="w-screen h-screen bg-stone-50 overflow-hidden flex">
      {/* Sidebar - Fixed width */}
      <div className="w-80 flex-shrink-0 p-4">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden p-4">
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          {/* Header with gradient background */}
          <div className="relative bg-gradient-to-r from-violet-700 via-purple-700 to-sky-800 p-6">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-white hover:bg-white/20 mb-6"
              >
                <ArrowLeft size={16} />
                Back to Dashboard
              </Button>
              
              <div className="flex items-center gap-6">
                {/* Avatar Section */}
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4 border-white/30">
                    {formData.avatar_url ? (
                      <AvatarImage src={formData.avatar_url} alt="Profile" />
                    ) : (
                      <AvatarFallback className="bg-white/20 text-white text-2xl font-semibold">
                        {getInitials()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      onClick={() => setShowAvatarSelector(true)}
                      className="absolute bottom-0 right-0 rounded-full p-2 h-8 w-8 bg-white hover:bg-gray-50"
                    >
                      <Camera size={14} className="text-gray-600" />
                    </Button>
                  )}
                </div>
                
                <div className="text-white">
                  <h1 className="text-3xl font-bold font-['Poppins'] mb-2">{getDisplayName()}</h1>
                  <p className="text-white/80 text-lg">{profileData.email}</p>
                  <div className="flex gap-4 mt-2 text-sm text-white/70">
                    <span>{profileData.timezone}</span>
                    <span>•</span>
                    <span>{profileData.language_preference === 'en' ? 'English' : profileData.language_preference}</span>
                  </div>
                </div>
                
                <div className="ml-auto">
                  {!isEditing ? (
                    <Button 
                      onClick={() => setIsEditing(true)} 
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                      variant="outline"
                    >
                      <User size={16} className="mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleSave} 
                        disabled={isSaving}
                        className="bg-white text-purple-700 hover:bg-white/90"
                      >
                        <Save size={16} className="mr-2" />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button 
                        onClick={handleCancel} 
                        variant="outline" 
                        disabled={isSaving}
                        className="border-white/50 text-white hover:bg-white/20 hover:text-white bg-black/10 backdrop-blur-sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Avatar Selector Modal */}
          {showAvatarSelector && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="p-6 m-4 max-w-lg w-full">
                <h3 className="text-lg font-semibold mb-4 text-center">Choose Your Avatar</h3>
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {avatarOptions.map((url, index) => (
                    <button
                      key={index}
                      onClick={() => handleAvatarSelect(url)}
                      className="relative group flex items-center justify-center"
                    >
                      <Avatar className={`w-16 h-16 transition-all duration-200 group-hover:scale-105 ${
                        formData.avatar_url === url 
                          ? 'ring-4 ring-blue-500 ring-offset-2' 
                          : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-1'
                      }`}>
                        <AvatarImage src={url} alt={`Avatar ${index + 1}`} className="object-cover" />
                        <AvatarFallback>A{index + 1}</AvatarFallback>
                      </Avatar>
                    </button>
                  ))}
                  {/* Default/No Avatar Option */}
                  <button
                    onClick={() => handleAvatarSelect('')}
                    className="relative group flex items-center justify-center"
                  >
                    <Avatar className={`w-16 h-16 transition-all duration-200 group-hover:scale-105 ${
                      !formData.avatar_url 
                        ? 'ring-4 ring-blue-500 ring-offset-2' 
                        : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-1'
                    }`}>
                      <AvatarFallback className="bg-gradient-to-br from-violet-500 via-purple-600 to-blue-600 text-white font-semibold">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => setShowAvatarSelector(false)} 
                    variant="outline" 
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Profile Form */}
          <div className="p-4">
            <div className="max-w-4xl mx-auto">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6 font-['Poppins']">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      value={formData.first_name}
                      onChange={(e) => handleInputChange('first_name', e.target.value)}
                      disabled={!isEditing}
                      className="mt-2"
                      placeholder="Enter your first name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      value={formData.last_name}
                      onChange={(e) => handleInputChange('last_name', e.target.value)}
                      disabled={!isEditing}
                      className="mt-2"
                      placeholder="Enter your last name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      disabled={true}
                      className="mt-2 bg-gray-50"
                      placeholder="Email cannot be changed"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      disabled={!isEditing}
                      className="mt-2"
                      placeholder="Choose a username"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="mt-2"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      value={formData.timezone}
                      onChange={(e) => handleInputChange('timezone', e.target.value)}
                      disabled={!isEditing}
                      className="mt-2 w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                    >
                      <option value="UTC">UTC</option>
                      <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                      <option value="America/New_York">America/New_York (EST)</option>
                      <option value="Europe/London">Europe/London (GMT)</option>
                      <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="language_preference">Language Preference</Label>
                    <select
                      id="language_preference"
                      value={formData.language_preference}
                      onChange={(e) => handleInputChange('language_preference', e.target.value)}
                      disabled={!isEditing}
                      className="mt-2 w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;
