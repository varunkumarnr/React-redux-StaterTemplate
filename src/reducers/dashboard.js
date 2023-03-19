import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = process.env.REACT_APP_BACKEND_URL;
export const dashboard = createAsyncThunk("api/dashboard", async () => {
  const response = await axios.get(URL + "api/");
  console.log(response.data.message);
  return response.data;
});

const initialState = {
  message: null,
  loading: true,
};
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(dashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(dashboard.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.message);
        state.message = action.payload.message;
      })
      .addCase(dashboard.rejected, (state) => {
        state.loading = false;
        state.message = null;
      });
  },
});
export default dashboardSlice.reducer;
