import {createSlice} from "@reduxjs/toolkit";


const workoutsListSlice = createSlice({
  name: 'workoutsList',
  initialState: {
    userWorkouts: [],
  },
  reducers: {
    setSports(state, action){
      state.userWorkouts = action.payload;
      if(action.payload?.length) {
        let set = new Set(['all', ...action?.payload?.map(workout => workout[1])])
        state.sports = [...set]
      }
    },

    removeSport(state, action){
      state.userWorkouts = state.userWorkouts.filter(workout => workout[0] !== action.payload)
      let set = new Set(['all', ...state.userWorkouts.map(workout => workout[1])])
      if(state.sports.length !== set.size)
      state.sports = [...set]
    },
    addSport(state, action){
      if(!state.sports.includes(action.payload))
      state.sports.push(action.payload)
    },
  }
})

export default workoutsListSlice.reducer;
export const {setSports, addSport, removeSport} = workoutsListSlice.actions;