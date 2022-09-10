import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isDarkMode: JSON.parse(localStorage.getItem('darkMode')) === null ? true : false,
  activeTab: 'all'
};
export const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    changeTheme(state) {
      localStorage.setItem('darkMode', !state.isDarkMode);
      state.isDarkMode = !state.isDarkMode;
    },
    changeActiveTab(state, action) {
      state.activeTab = action.payload
    }
  },
});

export const uiActions = uiSlice.actions;
