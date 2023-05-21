import React, {useContext} from 'react';
import AppContext from "../context/AppContext.js";
import AppLoader from "../components/Loaders/AppLoader.jsx";

const About = () => {
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
      <div >
        <h1>
          About App
        </h1>
      </div>
    );
  }
};

export default About;