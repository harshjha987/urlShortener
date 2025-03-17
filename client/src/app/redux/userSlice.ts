import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action to fetch user details
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const response = await axios.get("http://localhost:5000/auth/check", {
      withCredentials: true,
    });
    return response.data.user; // Assuming the response contains { user: { ... } }
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
});

interface User {
  _id: string;
  username: string;
  email: string;
  urls?: string[]; // ✅ Ensure 'urls' exists
}




interface UserState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: UserState = {
  user: null,
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failed";
        state.user = null;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
