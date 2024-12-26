'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../../config/utils/api';

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  signup: (userData: { username: string; email: string; password: string , role:string}) => Promise<boolean>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  getCurrentUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = async (credentials: { email: string; password: string }): Promise<boolean> => {
    try {
      const response = await api.post('/api/auth/login', credentials);
  
      if (response && response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        return true;
      }
  
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (userData: { username: string; email: string; password: string, role:string }) => {
    try {
      const response = await api.post('/api/auth/signup', userData);

      if (response && response.data) {
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
      }
      
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getCurrentUser = async () => {
    try {
      // const token = localStorage.getItem('token');
      // if (token) {
      //   const response = await api.get('/api/auth/me');
      //   setUser(response.data);
      // }
    } catch (error) {
      // console.error('Error fetching user:', error);
      // localStorage.removeItem('token');
      // setUser(null);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup, setUser, setLoading, getCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
