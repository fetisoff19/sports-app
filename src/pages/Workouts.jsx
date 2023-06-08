import React from 'react';
import {WorkoutsList} from "../components/WorkoutsList/WorkoutsList.js";
import AppLoader from "../components/Loaders/AppLoader.jsx";
import {useSelector} from "react-redux";

const Workouts = () => {
  const workouts = useSelector(state => state.workouts.workouts)
  const loader = useSelector(state => state.app.loader)

  if (loader || !workouts) {
    return <AppLoader/>;
  }
  else return (
    <>
      <WorkoutsList/>
    </>
  );
};

export default Workouts;