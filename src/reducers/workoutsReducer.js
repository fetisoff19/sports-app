import {createSlice} from "@reduxjs/toolkit";

 const workoutsSlice = createSlice({
  name: 'workouts',
  initialState: {
    workouts: null,
    workout: null,
  },
  reducers: {
    setWorkouts(state, action) {
      state.workouts = action.payload;
    },
    deleteWorkoutAction(state, action){
      state.workouts.filter(workout => workout.id !== action.payload)
    },
    changeWorkoutAction(state, action){
      state.workouts.map(workout =>
        workout.id === action.payload.id ? action.payload : workout)
    },
      setOneWorkout(state, action) {
      state.workout = action.payload;
    },
  }
})

export default workoutsSlice.reducer;
export const {setWorkouts, deleteWorkoutAction, changeWorkoutAction, setOneWorkout} = workoutsSlice.actions;