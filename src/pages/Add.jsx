import React, {useContext} from 'react';
import AddWorkouts from "../components/AddWorkouts/AddWorkouts.js";
import AppContext from "../context/AppContext.js";
import AppLoader from "../components/Loaders/AppLoader.jsx";

const Add = () => {
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
      <AddWorkouts/>
    );
  }
};

export default Add;