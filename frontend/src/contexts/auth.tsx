import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

type AuthContextData = {
  signIn: (username: string, password: string) => void;
  signOut: () => void;
  isAuthenticated: boolean;
}

type AuthResponse = {
  access_token: string;
}

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const access_token = Cookies.get('access_token');
    if (access_token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      setAuthenticated(true);
    }
  }, []);

  const signIn = async (username: string, password: string): Promise<void> => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', {
        username,
        password,
      });
      // extract access_token from response data
      const { access_token } = response.data;

      // set the authorization header for subsequent requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      // calculate expire date
      const expires = new Date(new Date().getTime() + 120 * 60 * 1000); // 120 minutes = 2 hours

      // store access_token as a cookie
      Cookies.set('access_token', access_token, { expires: expires });

      // set authenticated
      setAuthenticated(true);
    } catch(err) {
      const e = err as AxiosError;
      if (e.response) {
        console.error(e.response);
      }
      // set not authenticated
      setAuthenticated(false);
    }
  }

  const signOut = async (): Promise<void> => {
    Cookies.remove('access_token');
    setAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};