import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserDetailsState } from '../../types';
import { fetchUserById } from '../../services/api';
import { saveUserToIndexedDB, getUserFromIndexedDB } from '../../utils/storage';

const initialState: UserDetailsState = {
  user: null,
  loading: false,
  error: null,
};

export const fetchUserDetailsAsync = createAsyncThunk(
  'userDetails/fetchUser',
  async (userId: string) => {
    // Try to get from IndexedDB first
    const cachedUser = await getUserFromIndexedDB(userId);
    if (cachedUser) {
      return cachedUser;
    }

    // If not in cache, fetch from API
    const user = await fetchUserById(userId);
    if (user) {
      // Save to IndexedDB for future access
      await saveUserToIndexedDB(user);
      return user;
    }
    throw new Error('User not found');
  }
);

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    clearUserDetails: (state) => {
      state.user = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetailsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetailsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserDetailsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user details';
        state.user = null;
      });
  },
});

export const { clearUserDetails, clearError } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
