import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../Feature/Todo/TodoSlice";

export const Store = configureStore({
  reducer: todoReducer,
});