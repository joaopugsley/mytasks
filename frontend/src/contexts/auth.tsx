import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/api";
import Cookies from "js-cookie";

type AuthContextData = {
  checkAuth: () => void;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

type AuthResponse = {
  access_token: string;
}

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  const checkAuth = () => {
    const access_token = Cookies.get('access_token');
    if (access_token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  };

  const signIn = async (username: string, password: string) => {
    try {
      const response = await api.post<AuthResponse>('/api/auth/login', {
        username,
        password,
      });
      // extract access_token from response data
      const { access_token } = response.data;

      // set the authorization header for subsequent requests
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      // calculate expire date
      const expires = new Date(new Date().getTime() + 120 * 60 * 1000); // 120 minutes = 2 hours

      // store access_token as a cookie
      Cookies.set('access_token', access_token, { expires: expires });

      // set authenticated
      setAuthenticated(true);
    } catch(err) {
      // set not authenticated
      setAuthenticated(false);
      // re-throw err
      throw err;
    }
  }

  const signOut = () => {
    Cookies.remove('access_token');
    setAuthenticated(false);
  }

  useEffect(() => {
    checkAuth()
  }, []);

  return (
    <AuthContext.Provider value={{ checkAuth, signIn, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}