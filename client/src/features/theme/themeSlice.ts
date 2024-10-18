import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  mode: boolean;
}

const initialState: ThemeState = {
  mode: JSON.parse(localStorage.getItem("darkMode") || "false"),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.mode = !state.mode;
      localStorage.setItem("darkMode", JSON.stringify(state.mode));
    },
    setDarkMode: (state) => {
      state.mode = true;
      localStorage.setItem("darkMode", JSON.stringify(state.mode));
    },
    setLightMode: (state) => {
      state.mode = false;
      localStorage.setItem("darkMode", JSON.stringify(state.mode));
    },
  },
});

export const { toggleDarkMode, setDarkMode, setLightMode } = themeSlice.actions;

export default themeSlice.reducer;