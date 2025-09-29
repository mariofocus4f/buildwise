import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserType = 'manager' | 'investor';

interface UserTypeContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
  toggleUserType: () => void;
}

const UserTypeContext = createContext<UserTypeContextType | undefined>(undefined);

export const useUserType = () => {
  const context = useContext(UserTypeContext);
  if (context === undefined) {
    throw new Error('useUserType must be used within a UserTypeProvider');
  }
  return context;
};

interface UserTypeProviderProps {
  children: ReactNode;
}

export const UserTypeProvider: React.FC<UserTypeProviderProps> = ({ children }) => {
  const [userType, setUserTypeState] = useState<UserType>(() => {
    // Load from localStorage or default to manager
    const saved = localStorage.getItem('userType');
    return (saved as UserType) || 'manager';
  });

  useEffect(() => {
    // Save to localStorage whenever it changes
    localStorage.setItem('userType', userType);
  }, [userType]);

  const setUserType = (type: UserType) => {
    setUserTypeState(type);
  };

  const toggleUserType = () => {
    setUserTypeState(prev => prev === 'manager' ? 'investor' : 'manager');
  };

  const value: UserTypeContextType = {
    userType,
    setUserType,
    toggleUserType,
  };

  return <UserTypeContext.Provider value={value}>{children}</UserTypeContext.Provider>;
};
