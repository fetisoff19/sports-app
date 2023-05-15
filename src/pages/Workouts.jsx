import React, {useContext} from 'react';
import {WorkoutsList} from "../components/WorkoutsList/WorkoutsList.js";
import AppContext from "../context/AppContext.js";
import AppLoader from "../components/Loaders/AppLoader.jsx";

const Workouts = () => {
  const {loading, error, workouts} = useContext(AppContext);

  if (loading) {
    return <AppLoader/>;
  }
  else if (error) {
    console.error(error)
    return <div>Ошибка: {error.message}</div>;
  }
  else if (workouts) {
    return (
      <>
        <WorkoutsList/>
      </>
    );
  }

};

export default Workouts;