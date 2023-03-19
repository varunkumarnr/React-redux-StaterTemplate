import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = [];

export const setAlert = createAsyncThunk(
  "alert/setAlert",
  async ({ msg, alertType, timeout = 4000 }, { dispatch }) => {
    const id = uuidv4();
    dispatch(alertSlice.actions.addAlert({ msg, alertType, id }));
    setTimeout(() => {
      dispatch(alertSlice.actions.removeAlert(id));
    }, timeout);
    return id;
  }
);

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    addAlert: (state, action) => {
      state.push(action.payload);
    },
    removeAlert: (state, action) => {
      const id = action.payload;
      return state.filter((alert) => alert.id !== id);
    },
  },
});

export const { addAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;
