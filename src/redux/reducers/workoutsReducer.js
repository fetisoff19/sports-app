import {createSlice} from "@reduxjs/toolkit";

 const workoutsSlice = createSlice({
  name: 'workouts',
  initialState: {
    workouts: null,
    workout: null,
  },
  reducers: {
    setWorkouts(state, action) {
      state.workouts = action.payload.map(workout => {
        workout.timestamp = new Date(workout.timestamp)
        return workout;
      }).sort((a, b) => b.timestamp - a.timestamp);
    },
    deleteWorkoutAction(state, action){
      state.workouts = state.workouts.filter(workout => workout._id !== action.payload)
    },
    addWorkout(state, action) {
      action.payload.timestamp = new Date(action.payload.timestamp)
      state.workouts = [...state.workouts, action.payload].sort((a, b) => b.timestamp - a.timestamp);
    },
    changeWorkoutAction(state, action){
      state.workouts = state.workouts.map(workout => {
       if(workout._id === action.payload._id){
         action.payload.timestamp = new Date(action.payload.timestamp)
         return action.payload
       } else return workout
      })
    },
    setOneWorkout(state, action) {
      state.workout = action.payload;
    },
  }
})

export default workoutsSlice.reducer;
export const {setWorkouts, deleteWorkoutAction, changeWorkoutAction, setOneWorkout, addWorkout} = workoutsSlice.actions;