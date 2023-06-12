import {createSlice} from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: 'app',
  initialState: {
    appLoader: false,
    smallLoader: false,
    smallLoaderId: null,
    error: null
  },
  reducers: {
    showLoader(state) {
      state.appLoader = true;
    },
    hideLoader(state){
      state.appLoader = false;
    },
    setError(state, action){
      state.error = action.payload;
    },
    showSmallLoader(state, action) {
      state.smallLoaderId = action.payload;
      state.smallLoader = true;
    },
    hideSmallLoader(state){
      state.smallLoaderId = '';
      state.smallLoader = false;
    },
  }
})

export default appSlice.reducer;
export const {showLoader, hideLoader, setError, showSmallLoader, hideSmallLoader} = appSlice.actions;
