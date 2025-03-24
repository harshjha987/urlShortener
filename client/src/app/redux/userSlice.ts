import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const api_url = process.env.NEXT_PUBLIC_BASE_URL;
interface User {
  _id: string;
  username: string;
  email: string;
}

interface UserState {
  user: User | null;
  userUrls: { shortId: string; originalUrl: string; visitedHistory: any[] }[];
}

const initialState: UserState = {
  user: null,
  userUrls: [],
};

// Fetch user profile (called after login)
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await axios.get(`${api_url}/users/auth/check`, { withCredentials: true });
  return response.data.user;
});

// // Fetch user's shortened URLs
// export const fetchUserUrls = createAsyncThunk('user/fetchUserUrls', async () => {
//   const response = await axios.get(`${api_url}/users/urls`, { withCredentials: true });
//   return response.data.urls;
// });

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.userUrls = [];
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchUser.fulfilled, (state, action) => {
  //       state.user = action.payload;
  //     })
  //     .addCase(fetchUserUrls.fulfilled, (state, action) => {
  //       state.userUrls = action.payload;
  //     });
  // },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
