import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./todoSlice";
import { uiSlice } from "./uiSlice";

export const store = configureStore({
  reducer: { todos: todoSlice.reducer, ui: uiSlice.reducer },
});
