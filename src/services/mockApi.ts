import { User, UserProfile, UserStatus } from '../types';

const firstNames = ['Adedeji', 'Debby', 'John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'Robert', 'Lisa', 'Ayodeji', 'Tolu', 'Chukwu', 'Amina', 'Kemi'];
const lastNames = ['Ogana', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Adebayo', 'Okoro', 'Ibrahim', 'Adeyemi'];
const companies = ['Lendsqr', 'Irorun', 'Tech Corp', 'Innovation Inc', 'Global Solutions'];
const positions = ['Manager', 'Developer', 'Designer', 'Analyst', 'Engineer'];
const statuses: UserStatus[] = ['active', 'inactive', 'pending', 'blacklisted'];

const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

type MockDB = {
  users: User[];
  profiles: UserProfile[];
};

const generateMockDB = (count: number): MockDB => {
  const users: User[] = [];
  const profiles: UserProfile[] = [];

  for (let i = 1; i <= count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];

    const id = `USR-${String(i).padStart(6, '0')}`;

    const phone = `080${Math.floor(10000000 + Math.random() * 90000000)}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/\s/g, '')}.com`;

    const year = 2020 + Math.floor(Math.random() * 4);
    const month = Math.floor(Math.random() * 12);
    const day = Math.floor(Math.random() * 28) + 1;

    const joinDate = `${monthNames[month]} ${day}, ${year}`;

    users.push({
      id,
      firstName,
      lastName,
      email,
      phone,
      company,
      position: positions[Math.floor(Math.random() * positions.length)],
      address: `${i} Business Avenue, Lagos`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      joinDate,
      avatar: `https://i.pravatar.cc/150?img=${i % 70}`,
    });

    profiles.push({
      userId: id,
      userCode: `LSQF-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
      rating: Math.floor(Math.random() * 5) + 1,
      accountBalance: `₦${(Math.random() * 500000).toFixed(2)}`,
      bank: {
        accountNumber: `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        name: 'Providus Bank',
      },
      personalInfo: {
        fullName: `${firstName} ${lastName}`,
        phone,
        email,
        bvn: `${Math.floor(10000000000 + Math.random() * 90000000000)}`,
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        maritalStatus: Math.random() > 0.5 ? 'Single' : 'Married',
        children: Math.random() > 0.5 ? 'None' : '2',
        residence: "Parent's Apartment",
      },
      educationEmployment: {
        level: 'B.Sc',
        status: 'Employed',
        sector: 'FinTech',
        duration: '2 years',
        officeEmail: `hr@${company.toLowerCase().replace(/\s/g, '')}.com`,
        incomeRange: '₦200,000 - ₦400,000',
        loanRepayment: '₦40,000',
      },
      socials: {
        twitter: `@${firstName.toLowerCase()}`,
        facebook: `${firstName} ${lastName}`,
        instagram: `@${firstName.toLowerCase()}`,
      },
      guarantor: {
        fullName: 'Debby Ogana',
        phone: '07060780922',
        email: 'debby@gmail.com',
        relationship: 'Sister',
      },
    });
  }

  return { users, profiles };
};

/** 🔒 SINGLE SOURCE OF TRUTH */
export const MOCK_DB = generateMockDB(500);


