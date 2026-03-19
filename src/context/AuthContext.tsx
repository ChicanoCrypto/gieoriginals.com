import React, { createContext, useContext, useState, useCallback } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin credentials
const ADMIN_CREDENTIALS = {
  email: 'admin@gieoriginals.com',
  password: 'admin123',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setUser({
        id: '1',
        email: ADMIN_CREDENTIALS.email,
        name: 'Admin User',
        role: 'admin',
      });
      return true;
    }
    
    // Mock customer login
    if (email && password.length >= 6) {
      setUser({
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        role: 'customer',
      });
      return true;
    }
    
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const register = useCallback(async (email: string, password: string, name: string): Promise<boolean> => {
    if (email && password.length >= 6 && name) {
      setUser({
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role: 'customer',
      });
      return true;
    }
    return false;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
