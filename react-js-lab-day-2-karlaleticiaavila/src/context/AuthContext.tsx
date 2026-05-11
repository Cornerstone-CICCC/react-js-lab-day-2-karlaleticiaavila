import { createContext, useContext, useState, type ReactNode } from 'react';

type AuthContextType = {
  username: string;
  isLoggedIn: boolean;
  isDarkMode: boolean;
  login: (name: string) => void;
  logout: () => void;
  toggleTheme: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const login = (name: string) => {
    setUsername(name);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUsername('');
    setIsLoggedIn(false);
  };

  const toggleTheme = () => {
    setIsDarkMode((current) => !current);
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        isLoggedIn,
        isDarkMode,
        login,
        logout,
        toggleTheme,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};