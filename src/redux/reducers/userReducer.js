import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: {},
    isAuth: !!localStorage.getItem('token'),
    // files: [],
  },
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload;
      state.isAuth = true;
    },
    logout(state){
      localStorage.removeItem('token')
      state.currentUser = {};
      state.isAuth = false;
    },
    // setFiles(state, action){
    //   state.files = action.payload;
    // },
  }
})

export default userSlice.reducer;
export const {setUser, logout} = userSlice.actions;
