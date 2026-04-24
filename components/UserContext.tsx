"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface UserContextType {
  user: any;
  role: string | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({ user: null, role: null, loading: true });

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to get user/role from localStorage (set after login)
    const userData = localStorage.getItem('user');
    const userRole = localStorage.getItem('role');
    if (userData && userRole) {
      setUser(JSON.parse(userData));
      setRole(userRole);
    }
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ user, role, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
