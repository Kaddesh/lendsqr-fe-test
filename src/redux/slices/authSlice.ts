// redux/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';
import { loginUser } from '../../services/api';
import { localStorageUtils } from '../../utils/storage';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const result = await loginUser(credentials.email, credentials.password);
    if (result.success && result.user) {
      localStorageUtils.setItem('authUser', result.user); // store full user
      return result.user;
    } else {
      throw new Error(result.error || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      localStorageUtils.removeItem('authUser');
    },
    clearError: (state) => {
      state.error = null;
    },
    restoreAuth: (state, action: PayloadAction<User | null>) => {
      if (action.payload) {
        state.isAuthenticated = true;
        state.user = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.error.message || 'Login failed';
      });
  },
});

export const { logout, clearError, restoreAuth } = authSlice.actions;
export default authSlice.reducer;
