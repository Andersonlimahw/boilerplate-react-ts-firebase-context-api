import React, { createContext } from 'react';
import { defaultContext } from '../../context/AuthContext';

interface AuthProps {
  login: () => void;
  user: any;
}

export const AuthContext = createContext<AuthProps | undefined>(defaultContext);

export const AuthProvider: React.FC<any> = ({ value, children }) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
