import React, {useContext} from 'react';
import AppContext from "../context/AppContext.js";
import DashboardContent from "../components/DashboardContent/DashboardContent.js";
import AppLoader from "../components/Loaders/AppLoader.jsx";


const Dashboard = () => {
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
      <DashboardContent/>
    );
  }
};

export default Dashboard;