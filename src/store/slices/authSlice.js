import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authClient from "@/lib/authClient";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

const normalizeUser = (user) => ({
  id: user._id || user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

export const fetchSession = createAsyncThunk(
  "auth/fetchSession",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authClient.getMe();
      return normalizeUser(response.data.data);
    } catch (error) {
      if (error.response?.status === 401) {
        return null;
      }
      return rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authClient.login(credentials);
      return normalizeUser(response.data.data.user);
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error, "Login failed. Please try again."));
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authClient.register({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        getApiErrorMessage(error, "Registration failed. Please try again."),
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authClient.logout();
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error, "Logout failed."));
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (_email, { rejectWithValue }) => {
    return rejectWithValue("Password reset is not available yet. Please contact support.");
  },
);

const initialState = {
  user: null,
  isAuthenticated: false,
  sessionChecked: false,
  loading: false,
  error: null,
  forgotPasswordSent: false,
  registerSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearSession: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    clearForgotPasswordSent: (state) => {
      state.forgotPasswordSent = false;
    },
    clearRegisterSuccess: (state) => {
      state.registerSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionChecked = true;
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(fetchSession.rejected, (state, action) => {
        state.loading = false;
        state.sessionChecked = true;
        state.error = action.payload;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.sessionChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registerSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registerSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
        state.forgotPasswordSent = false;
        state.registerSuccess = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      });

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

export const {
  clearSession,
  updateUser,
  clearError,
  clearForgotPasswordSent,
  clearRegisterSuccess,
} = authSlice.actions;

export default authSlice.reducer;
