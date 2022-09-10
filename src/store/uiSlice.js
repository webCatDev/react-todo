import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isDarkMode: false,
  activeTab: 'all'
};
export const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    changeTheme(state) {
      state.isDarkMode = !state.isDarkMode;
    },
    changeActiveTab(state, action) {
      state.activeTab = action.payload
    }
  },
});

export const uiActions = uiSlice.actions;
