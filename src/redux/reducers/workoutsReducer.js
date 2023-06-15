import {createSlice} from "@reduxjs/toolkit";

 const workoutsSlice = createSlice({
  name: 'workouts',
  initialState: {
    workouts: null,
    workout: null,
    uploadedFiles: [],
    chosenSport: 'all',
    chosenField: 'timestamp',
    direction: 1,
  },
  reducers: {
    setWorkouts(state, action) {
      state.workouts = action.payload.map(workout => {
        workout.timestamp = new Date(workout.timestamp)
        workout.startTime = new Date(workout.startTime)
        return workout;
      })
    },
    deleteWorkoutAction(state, action){
      state.workouts = state.workouts.filter(workout => workout._id !== action.payload)
    },
    addWorkout(state, action) {
      state.uploadedFiles = [...state.uploadedFiles, action.payload]
      // action.payload.timestamp = new Date(action.payload.timestamp)
      // state.workouts = [...state.workouts, action.payload].sort((a, b) => b.timestamp - a.timestamp);
    },
    resetStateUploadedFiles(state){
      state.uploadedFiles = [];
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
    setChosenSport(state, action){
      state.chosenSport = action.payload
    },
    setChosenField(state, action){
      state.chosenField = action.payload
    },
    setDirection(state){
      state.direction = state.direction > 0 ? 0 : 1
    }

  }
})

export default workoutsSlice.reducer;
export const {
  setWorkouts,
  deleteWorkoutAction,
  changeWorkoutAction,
  setOneWorkout,
  addWorkout,
  resetStateUploadedFiles,
  setChosenSport,
  setChosenField,
  setDirection
} = workoutsSlice.actions;