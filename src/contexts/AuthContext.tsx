import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: Record<UserRole, User> = {
  student: {
    id: '1',
    name: 'Piyush',
    email: 'piyush.cse24@cmrit.ac.in',
    role: 'student',
    department: 'Computer Science',
  },
  faculty: {
    id: '2',
    name: 'Dr. Kavyashree',
    email: 'kavyashree100@cmrit.ac.in',
    role: 'faculty',
    department: 'Computer Science',
  },
  hod: {
    id: '3',
    name: 'Prof. Keshav',
    email: 'keshav100@cmrit.ac.in',
    role: 'hod',
    department: 'Computer Science',
  },
  developer: {
    id: '4',
    name: 'Dev Admin',
    email: 'admin@university.edu',
    role: 'developer',
    department: 'IT Administration',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Mock authentication - in production, this would call an API
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    if (email && password) {
      setUser(mockUsers[role]);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
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
