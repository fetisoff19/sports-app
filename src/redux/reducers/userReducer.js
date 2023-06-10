import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: {},
    isAuth: localStorage.getItem('auth'),
    files: [],
  },
  reducers: {
    setUser(state, action) {
      localStorage.setItem('auth', 'true')
      state.currentUser = action.payload;
      state.isAuth = true;
    },
    logout(state){
      localStorage.removeItem('token')
      localStorage.removeItem('auth');
      state.currentUser = {};
      state.isAuth = false;
    },
    setFiles(state, action){
      state.files = action.payload;
    },
  }
})

export default userSlice.reducer;
export const {setUser, logout, setFiles} = userSlice.actions;
