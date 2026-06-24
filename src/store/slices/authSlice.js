import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "@/lib/axiosInstance";

// Mock response helper
const simulateDemoResponse = (endpoint, data) => {
  return new Promise((resolve) => {
    const delay = 1000 + Math.random() * 500; // 1000-1500ms delay

    setTimeout(() => {
      if (endpoint === "/login" || endpoint === "/register") {
        // Mock successful auth response
        const dummyToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJTIERlbW8gVXNlciIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
        const dummyUser = {
          id: 1,
          name: data.name || "RS Demo User",
          email: data.email || "demo@rs3dwallpaper.com",
          phone: data.phone || "+880 1700 000000",
        };
        resolve({ data: { user: dummyUser, token: dummyToken } });
      } else if (endpoint === "/forgot-password") {
        // Mock forgot password success
        resolve({
          data: { message: "Password reset link sent to your email" },
        });
      }
    }, delay);
  });
};

// Thunks
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      // REAL API (commented out, uncomment to go live)
      // const response = await axiosInstance.post("/login", credentials);
      // return response.data;

      // DEMO RESPONSE
      const response = await simulateDemoResponse("/login", credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      // REAL API (commented out, uncomment to go live)
      // const response = await axiosInstance.post("/register", userData);
      // return response.data;

      // DEMO RESPONSE
      const response = await simulateDemoResponse("/register", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      // REAL API (commented out, uncomment to go live)
      // const response = await axiosInstance.post("/forgot-password", { email });
      // return response.data;

      // DEMO RESPONSE
      const response = await simulateDemoResponse("/forgot-password", {
        email,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to send reset link. Please try again.",
      );
    }
  },
);

// Initial State
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  forgotPasswordSent: false,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initAuth: (state) => {
      if (typeof window !== "undefined" && localStorage) {
        const token = localStorage.getItem("rs_auth_token");
        const user = localStorage.getItem("rs_auth_user");

        if (token && user) {
          state.token = token;
          state.user = JSON.parse(user);
          state.isAuthenticated = true;
        }
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.forgotPasswordSent = false;

      if (typeof window !== "undefined" && localStorage) {
        localStorage.removeItem("rs_auth_token");
        localStorage.removeItem("rs_auth_user");
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    clearForgotPasswordSent: (state) => {
      state.forgotPasswordSent = false;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;

        if (typeof window !== "undefined" && localStorage) {
          localStorage.setItem("rs_auth_token", action.payload.token);
          localStorage.setItem(
            "rs_auth_user",
            JSON.stringify(action.payload.user),
          );
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;

        if (typeof window !== "undefined" && localStorage) {
          localStorage.setItem("rs_auth_token", action.payload.token);
          localStorage.setItem(
            "rs_auth_user",
            JSON.stringify(action.payload.user),
          );
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Forgot Password
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.forgotPasswordSent = false;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.forgotPasswordSent = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { initAuth, logout, clearError, clearForgotPasswordSent } =
  authSlice.actions;
export default authSlice.reducer;
