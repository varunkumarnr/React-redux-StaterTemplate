import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./reducers/alert";
import auth from "./reducers/auth";
import dashboard from "./reducers/dashboard";

const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: auth,
    dashboard: dashboard,
  },
});

export default store;
