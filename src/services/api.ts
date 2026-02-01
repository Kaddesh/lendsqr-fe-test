import { MOCK_DB } from "./mockApi";
import { User, UserFilters, UserProfile } from "../types";


export const fetchUsers = async (
  page = 1,
  pageSize = 10,
  filters?: UserFilters,
  searchTerm?: string,
): Promise<{ data: User[]; total: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredUsers = [...MOCK_DB.users];

      if (filters) {
        if (filters.organization) {
          filteredUsers = filteredUsers.filter((u) =>
            u.company
              .toLowerCase()
              .includes(filters.organization!.toLowerCase()),
          );
        }

        if (filters.username) {
          filteredUsers = filteredUsers.filter((u) =>
            `${u.firstName} ${u.lastName}`
              .toLowerCase()
              .includes(filters.username!.toLowerCase()),
          );
        }

        if (filters.email) {
          filteredUsers = filteredUsers.filter((u) =>
            u.email.toLowerCase().includes(filters.email!.toLowerCase()),
          );
        }

        if (filters.phone) {
          filteredUsers = filteredUsers.filter((u) =>
            u.phone.includes(filters.phone!),
          );
        }

        if (filters.status) {
          filteredUsers = filteredUsers.filter(
            (u) => u.status === filters.status,
          );
        }

        if (filters.date) {
          filteredUsers = filteredUsers.filter((u) =>
            u.joinDate.includes(filters.date!),
          );
        }
      }

      if (searchTerm && searchTerm.trim() !== '') {
    const term = searchTerm.toLowerCase(); // ✅ now this is a string
    filteredUsers = filteredUsers.filter((u) => {
      const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
      return (
        fullName.includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.phone.includes(term) ||
        u.company.toLowerCase().includes(term)
      );
    });
  }

      const start = (page - 1) * pageSize;
      const paginated = filteredUsers.slice(start, start + pageSize);

      resolve({
        data: paginated,
        total: filteredUsers.length,
      });
    }, 400);
  });
};

export const fetchUserById = async (id: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_DB.users.find((u) => u.id === id) || null);
    }, 300);
  });
};

export const fetchUserProfileById = async (
  userId: string,
): Promise<UserProfile | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_DB.profiles.find((p) => p.userId === userId) || null);
    }, 300);
  });
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<{ success: boolean; user?: User; error?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = MOCK_DB.users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase(),
      );
      if (user && password.length > 0) {
        resolve({ success: true, user });
      } else {
        resolve({ success: false, error: "Invalid credentials" });
      }
    }, 400);
  });
};

{
  /*
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

    */
}
