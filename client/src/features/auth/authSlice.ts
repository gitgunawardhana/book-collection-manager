import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

interface AuthState {
  user: null | { name: string; email: string; username: string; token: string };
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: { name: string; email: string; username: string; password: string }) => {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data.data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: { username: string; password: string }) => {
    console.log("Attempting to log in with credentials:", userData);
    const response = await axiosInstance.post("/auth/login", userData);
    console.log("Login response received:", response.data);
    return response.data.data;
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async () => {
    const user = localStorage.getItem('user');
    const { refreshToken } = JSON.parse(user!);
    const response = await axiosInstance.post("/auth/logout", { refreshToken });
    console.log("Logout response received:", response.data);
    return response.data.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    setUser: (state, action) => {
      console.log("Setting user in state:", action.payload);
      state.user = action.payload; // Set user in state
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save user to localStorage
    },
    setLoading: (state, action) => {
      console.log("Set Loading:", action.payload);
      state.loading = action.payload;
    },
    loadUser: (state) => {
      console.log("Loading user from localStorage.");
      const user = localStorage.getItem("user"); // Load user from localStorage
      if (user) {
        state.user = JSON.parse(user);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        console.log("Login request is pending...");
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Login request fulfilled:", action.payload);
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        toast.success("Login Successfull", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: localStorage.getItem("darkMode") === "true" ? "dark" : "light",
        });
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("Login request failed:", action.error.message);
        state.loading = false;
        state.error = action.error.message || "Login failed";
        toast.error("Login failed", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: localStorage.getItem("darkMode") === "true" ? "dark" : "light",
        });
      })
      .addCase(logoutUser.pending, (state) => {
        console.log("Logout request is pending...");
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        console.log("Logout request fulfilled:", action.payload);
        state.loading = false;
        state.user = null;
        localStorage.removeItem("user");
        toast.success("Logout Successfull", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: localStorage.getItem("darkMode") === "true" ? "dark" : "light",
        });
      })
      .addCase(logoutUser.rejected, (state, action) => {
        console.log("Logout request failed:", action.error.message);
        state.loading = false;
        state.error = action.error.message || "Login failed";
        toast.error("Login failed", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: localStorage.getItem("darkMode") === "true" ? "dark" : "light",
        });
      })
      .addCase(registerUser.pending, (state) => {
        console.log("Registration request is pending...");
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = true;
        state.error = null;
        toast.success("Registration Successfull", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: localStorage.getItem("darkMode") === "true" ? "dark" : "light",
        });
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log("Registration request failed:", action.error.message);
        state.loading = false;
        state.error = action.error.message || "Registration failed";
        toast.error("Registration failed", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: localStorage.getItem("darkMode") === "true" ? "dark" : "light",
        });
      });
  },
});

export const { logout, setUser, loadUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
