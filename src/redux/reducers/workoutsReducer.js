import {createSlice} from "@reduxjs/toolkit";

 const workoutsSlice = createSlice({
  name: 'workouts',
  initialState: {
    workouts: null,
    workout: null,  // del
    allWorkouts: [],
    uploadedFiles: [],
    polylines: [],
    chartsData: [],
    powerCurve: [],
    numberOfFiles: 0,
    stats: {},
  },
  reducers: {
    setWorkouts(state, action) {
      state.workouts = action.payload;
    },
    setAllWorkouts(state, action){
      const arrayForSort = [...action.payload]
      state.allWorkouts = arrayForSort.sort((a, b) => b[2] - a[2])
    },
    addWorkouts(state, action) {
      state.workouts = [...state.workouts, ...action.payload]
    },
    addPolyline(state, action){
      state.polylines = [...state.polylines, action.payload]
    },
    addChartsData(state, action){
      state.chartsData = [...state.chartsData, action.payload]
    },
    addPowerCurve(state, action){
      state.powerCurve = [...state.powerCurve, action.payload]
    },
    deleteWorkoutAction(state, action) {
      state.workouts = state.workouts.filter(workout => workout._id !== action.payload)
      state.allWorkouts = state.allWorkouts.filter(workout => workout[2] !== action.payload)
    },
    addWorkout(state, action) {
      state.uploadedFiles = [...state.uploadedFiles, action.payload]
    },
    resetStateUploadedFiles(state) {
      state.uploadedFiles = [];
    },
    changeWorkoutAction(state, action) {
      state.workouts = state.workouts.map(workout =>
        workout._id === action.payload._id
          ? action.payload
            : workout
      )
    },
    setOneWorkout(state, action) {
      state.workout = action.payload;
    },
    setNumberOfFiles(state, action){
      state.numberOfFiles = action.payload;
    },
    setStats(state, action){
      state.stats = action.payload;
    },
  }
})

export default workoutsSlice.reducer;

export const {
  setWorkouts,
  setAllWorkouts,
  deleteWorkoutAction,
  changeWorkoutAction,
  setOneWorkout,
  addPolyline,
  addChartsData,
  addPowerCurve,
  addWorkouts,
  addWorkout,
  resetStateUploadedFiles,
  setNumberOfFiles,
  setStats,
} = workoutsSlice.actions;