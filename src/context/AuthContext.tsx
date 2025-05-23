import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthState, LoginCredentials, RegisterCredentials, ResetPasswordData, User } from '../types/auth';
import { api } from '../services/api';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: ResetPasswordData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
        return;
      }
      
      try {
        // Verify token validity
        const decoded = jwtDecode<{ exp: number, user: User }>(token);
        
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
          return;
        }
        
        // Set auth header
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Get user data
        const response = await api.get('/auth/me');
        
        setState({
          user: response.data.user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        localStorage.removeItem('token');
        setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
      }
    };
    
    loadUser();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, user } = response.data;
      
      // Store token in localStorage if rememberMe is true
      if (credentials.rememberMe) {
        localStorage.setItem('token', token);
      } else {
        // For session only
        sessionStorage.setItem('token', token);
      }
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      const response = await api.post('/auth/register', credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const forgotPassword = async (email: string) => {
    try {
      await api.post('/auth/forgot-password', { email });
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (data: ResetPasswordData) => {
    try {
      await api.post('/auth/reset-password', data);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};