export type UserStatus = 'active' | 'inactive' | 'pending' | 'blacklisted';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  address: string;
  status: UserStatus;
  joinDate: string;
  avatar: string;
}

export interface UserProfile {
  userId: string;
  userCode: string;
  rating: number;
  accountBalance: string;
  bank: {
    accountNumber: string;
    name: string;
  };
  personalInfo: {
    fullName: string;
    phone: string;
    email: string;
    bvn: string;
    gender: string;
    maritalStatus: string;
    children: string;
    residence: string;
  };
  educationEmployment: {
    level: string;
    status: string;
    sector: string;
    duration: string;
    officeEmail: string;
    incomeRange: string;
    loanRepayment: string;
  };
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantor: {
    fullName: string;
    phone: string;
    email: string;
    relationship: string;
  };
}


export interface AuthState {
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  loading: boolean;
  error: string | null;
}

export interface UsersState {
  data: User[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
  total: number;
}

export interface UserDetailsState {
  user: User | null;
  loading: boolean;
  error: string | null;
}