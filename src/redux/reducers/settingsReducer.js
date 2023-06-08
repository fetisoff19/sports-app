import {changeLanguage} from "../../config/config.js";
import {createSlice} from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    language: localStorage.getItem('language') || 'ru',
    smoothing: localStorage.getItem('smoothing') || '8',
    funnyMarkers: localStorage.getItem('funnyMarkers') === 'true' || false,
  },
  reducers: {
    setLanguage(state, action) {
      localStorage.setItem('language', action.payload);
      changeLanguage(action.payload);
      state.language = action.payload;
    },
    setSmoothing(state, action){
      localStorage.setItem('smoothing', action.payload);
      state.smoothing = action.payload;
    },
    setFunnyMarkers(state, action){
      localStorage.setItem('funnyMarkers', action.payload.toString())
      state.funnyMarkers = action.payload;
    },
  }
})

export default settingsSlice.reducer;
export const {setLanguage, setSmoothing, setFunnyMarkers} = settingsSlice.actions;