"use client";

import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getApiUrl, API_CONFIG } from "../lib/api-config";

// Define user session type
export interface UserSession {
  accessToken: string;
  userId: number;
  email: string;
  name?: string;
  companyId: string;
  permissions?: string[];
  user?: {
    id: number;
    email: string;
    name?: string;
    companyId: string;
    companyName?: string;
    [key: string]: unknown;
  };
}

// Define the AuthContext type
interface AuthContextType {
  userSession: UserSession | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (
    payload: { name: string; email: string; password: string; phone?: string }
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

// Helper functions for localStorage
const getStoredToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

const getStoredUser = (): UserSession | null => {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem(USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

const setStoredAuth = (token: string, user: UserSession) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  // also set cookie for middleware protection
  document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;
};

const clearStoredAuth = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  document.cookie = "auth_token=; path=/; max-age=0";
};

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  // Load session from storage on mount
  useEffect(() => {
    const token = getStoredToken();
    const user = getStoredUser();

    if (token && user) {
      setUserSession(user);
        // refresh auth cookie if missing
        document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await axios.post(getApiUrl("/users/login"), {
        email,
        password,
        companyId: API_CONFIG.companyId,
      });

      const resData = response.data?.data || response.data;
      const accessToken = resData?.accessToken || response.data?.accessToken;
      const user = resData?.user || response.data?.user;

      if (accessToken && user) {
        const session: UserSession = {
          accessToken,
          userId: user.id,
          email: user.email,
          name: user.name,
          companyId: user.companyId || API_CONFIG.companyId,
          permissions: user.permissions,
          user,
        };

        setStoredAuth(accessToken, session);
        setUserSession(session);
        document.cookie = `auth_token=${accessToken}; path=/; max-age=${60 * 60 * 24 * 7}`;
        return { success: true };
      }

      return { success: false, error: "Invalid response from server" };
    } catch (error: unknown) {
      console.error("Login error:", error);
      const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
      const errorMessage = axiosError.response?.data?.message || axiosError.message || "Invalid credentials";
      return { success: false, error: errorMessage };
    }
  };

  const register = async (
    payload: { name: string; email: string; password: string; phone?: string }
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await axios.post(getApiUrl("/users"), {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        phone: payload.phone,
        companyId: API_CONFIG.companyId,
      });

      // Auto-login on successful registration if tokens provided
      const resData = response.data?.data || response.data;
      const accessToken = resData?.accessToken || response.data?.accessToken;
      const user = resData?.user || response.data?.user;
      if (accessToken && user) {
        const session: UserSession = {
          accessToken,
          userId: user.id,
          email: user.email,
          name: user.name,
          companyId: user.companyId || API_CONFIG.companyId,
          permissions: user.permissions,
          user,
        };
        setStoredAuth(accessToken, session);
        setUserSession(session);
        document.cookie = `auth_token=${accessToken}; path=/; max-age=${60 * 60 * 24 * 7}`;
      }

      return { success: true };
    } catch (error: unknown) {
      console.error("Register error:", error);
      const axiosError = error as { 
        response?: { 
          data?: { message?: string; error?: string } | string[]; 
        }; 
        message?: string;
      };
      const apiMessage =
        (typeof axiosError.response?.data === 'object' && axiosError.response.data && 'message' in axiosError.response.data) 
          ? (axiosError.response.data as { message?: string }).message
          : (typeof axiosError.response?.data === 'object' && axiosError.response.data && 'error' in axiosError.response.data)
          ? (axiosError.response.data as { error?: string }).error
          : Array.isArray(axiosError.response?.data) 
          ? axiosError.response.data.join(", ") 
          : undefined;
      const errorMessage = apiMessage || axiosError.message || "Registration failed";
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    clearStoredAuth();
    setUserSession(null);
  };

  return (
    <AuthContext.Provider value={{ userSession, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
