import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL = process.env.REACT_APP_BACKEND_URL;
export const login = createAsyncThunk("auth/login", async (formData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(formData);
  console.log(URL);
  const response = await axios.post(URL + "auth/email/", body, config);
  console.log(response.data);
  return response.data;
});

export const tokenValidation = createAsyncThunk(
  "auth/token",
  async (formData, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(formData);
      console.log(body);
      const response = await axios.post(URL + "auth/token/", body, config);
      console.log(process.env.BACKEND_URL);
      console.log(response.data);
      return response.data;
    } catch (err) {
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(err.response.data);
    }
  }
);
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: localStorage.getItem("token") ? true : false,
  loading: true,
  user: null,
  userEmail: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ...
    setUserEmail: (state, action) => {
      localStorage.setItem("email", action.payload);
      state.userEmail = action.payload;
    },

    logout: (state, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      state.userEmail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("token", null);
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(login.rejected, (state) => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(tokenValidation.pending, (state) => {
        state.loading = true;
      })
      .addCase(tokenValidation.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(tokenValidation.rejected, (state, action) => {
        localStorage.removeItem("token");
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        console.log(action.error);
      });
  },
});

export const { setUserEmail, logout } = authSlice.actions;
export default authSlice.reducer;
