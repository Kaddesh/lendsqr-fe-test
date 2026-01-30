import { MOCK_DB } from './mockApi';
import { User, UserProfile } from '../types';

export const fetchUsers = async (
  page = 1,
  pageSize = 10
): Promise<{ data: User[]; total: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * pageSize;
      resolve({
        data: MOCK_DB.users.slice(start, start + pageSize),
        total: MOCK_DB.users.length,
      });
    }, 400);
  });
};

export const fetchUserById = async (id: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_DB.users.find(u => u.id === id) || null);
    }, 300);
  });
};

export const fetchUserProfileById = async (
  userId: string
): Promise<UserProfile | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_DB.profiles.find(p => p.userId === userId) || null);
    }, 300);
  });
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = MOCK_DB.users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (user && password.length > 0) {
        resolve({ success: true, user });
      } else {
        resolve({ success: false, error: 'Invalid credentials' });
      }
    }, 400);
  });
};


{/*
export const fetchUsers = async (page: number = 1, pageSize: number = 10): Promise<{ data: User[]; total: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allUsers = generateMockUsers(500);
      const startIndex = (page - 1) * pageSize;
      const paginatedUsers = allUsers.slice(startIndex, startIndex + pageSize);
      
      resolve({
        data: paginatedUsers,
        total: allUsers.length,
      });
    }, 500); // Simulate network delay
  });
};

export const fetchUserById = async (id: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allUsers = generateMockUsers(500);
      const user = allUsers.find(u => u.id === id) || null;
      resolve(user);
    }, 300);
  });
};

    */}