import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserFilters, UsersState } from '../../types';
import { fetchUsers } from '../../services/api';

const initialState: UsersState = {
  data: [],
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
  total: 0,
  filters: {},
  searchTerm: '',
};

export const fetchUsersAsync = createAsyncThunk(
  'users/fetchUsers',
  async (params: { page: number; pageSize: number; filters: UserFilters; searchTerm?: string}) => {
    const result = await fetchUsers(params.page, params.pageSize, params.filters, params.searchTerm);
    return result;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<UserFilters>) => {
    state.filters = action.payload;
    state.currentPage = 1; 
  },
  clearFilters: (state) => {
    state.filters = {};
    state.currentPage = 1;
  },
  setSearchTerm: (state, action: PayloadAction<string>) => {
    state.searchTerm = action.payload;
    state.currentPage = 1; 
},
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.total = action.payload.total;
        state.error = null;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { setPageSize, setCurrentPage, setFilters,
  clearFilters, clearError, setSearchTerm } = usersSlice.actions;
export default usersSlice.reducer;
