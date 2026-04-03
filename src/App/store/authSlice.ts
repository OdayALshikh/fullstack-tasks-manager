import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { SingUpdate, AuthState, User, SingInData } from "../../lib/Types";
import { apiSignUp, apiSignIn } from "../../services/authService";

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (data: SingUpdate, { rejectWithValue }) => {
    try {
      const user = await apiSignUp(data);
      return user;
    } catch (error: any) {
      console.error("Error during sign up:", error);
      return rejectWithValue(error.response?.data?.message || "Sign up failed");
    }
  },
);
//action for sign in user
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data: SingInData, { rejectWithValue }) => {
    try {
      const user = await apiSignIn(data);
      return user;
    } catch (error: any) {
      console.error("Error during sign in:", error);
      return rejectWithValue(error.response?.data?.message || "Sign in failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { clearError } = authSlice.actions;
export default authSlice.reducer;
