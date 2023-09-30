import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../Feature/Todo/TodoSlice";

export const store = configureStore({
  reducer: todoReducer,
});
