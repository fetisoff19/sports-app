import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: {},
    isAuth: localStorage.getItem('auth')
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
  }
})

export default userSlice.reducer;
export const {setUser, logout} = userSlice.actions;
