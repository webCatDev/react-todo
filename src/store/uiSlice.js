import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isDarkMode: false,
};
export const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    changeTheme(state) {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const uiActions = uiSlice.actions;
