import React, {useContext} from 'react';
import AppContext from "../context/AppContext.js";
import AppLoader from "../components/Loaders/AppLoader.jsx";
import ViewWorkout from "../components/ViewWorkout/ViewWorkout";

const View = () => {
  const {loading, error, workouts} = useContext(AppContext);

  if (loading) {
    return <AppLoader/>;
  }
  else if (error) {
    console.error(error)
    return <div>Ошибка: {error.message}</div>;
  }
  else if (workouts)
  return (
    <>
      <ViewWorkout/>
    </>
  );
};

export default View;