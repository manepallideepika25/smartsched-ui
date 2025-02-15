"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("🔹 Restoring user session...");
      setUser(jwtDecode<User>(token));
    }
  }, []);

  const login = (token: string) => {
    console.log("🔹 Storing token & logging in...");
    localStorage.setItem("token", token);
    setUser(jwtDecode<User>(token));

    console.log("🔹 Redirecting to /dashboard...");
    router.replace("/dashboard"); // ✅ Ensures navigation happens
  };

  const logout = () => {
    console.log("🔹 Logging out...");
    localStorage.removeItem("token");
    setUser(null);
    router.replace("/");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
