import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useUserProfile } from '@/hooks/useUserProfile';
import { User } from 'lucide-react';

interface UserAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showFallbackIcon?: boolean;
}

const UserAvatar = ({ size = 'md', className = '', showFallbackIcon = true }: UserAvatarProps) => {
  const { getAvatarUrl, getInitials, loading } = useUserProfile();

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-11 h-11 text-sm', 
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 text-2xl'
  };

  const avatarUrl = getAvatarUrl();
  const initials = getInitials();

  if (loading) {
    return (
      <div className={`${sizeClasses[size]} rounded-full bg-gray-200 animate-pulse ${className}`} />
    );
  }

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      {avatarUrl ? (
        <AvatarImage 
          src={avatarUrl} 
          alt="Profile"
          onError={(e) => {
            // Hide the image if it fails to load
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : null}
      <AvatarFallback className="bg-gradient-to-br from-violet-700 via-purple-700 to-sky-800 text-white font-semibold">
        {showFallbackIcon && !initials ? (
          <User className={size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : size === 'xl' ? 'w-12 h-12' : 'w-6 h-6'} />
        ) : (
          initials || 'U'
        )}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
