import userReducer from "./userReducer";
import settingsSlice from "./settingsReducer"
import appReducer from "./appReducer";
import {configureStore} from "@reduxjs/toolkit";
import workoutsSlice from './workoutsReducer'

const rootReducer = {
  user: userReducer,
  workouts: workoutsSlice,
  settings: settingsSlice,
  app: appReducer
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,       // исходные файлы включают в себя объекты timestamp
    }),
})