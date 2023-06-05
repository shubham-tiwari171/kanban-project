import { configureStore } from "@reduxjs/toolkit";
import loggedInSlice from "../reducers/reducers";
export const store = configureStore({
  reducer: { users: loggedInSlice },
});
