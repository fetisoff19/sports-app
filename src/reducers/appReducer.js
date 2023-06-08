import {createSlice} from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: 'app',
  initialState: {
    loader: false,
    error: null
  },
  reducers: {
    showLoader(state) {
      state.loader = true;
    },
    hideLoader(state){
      state.loader = false;
    },
    setError(state, action){
      state.error = action.payload;
    },
  }
})

export default appSlice.reducer;
export const {showLoader, hideLoader, setError} = appSlice.actions;
