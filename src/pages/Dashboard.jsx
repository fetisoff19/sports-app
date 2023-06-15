import React from 'react';
import DashboardContent from "../components/DashboardContent/DashboardContent.js";
import AppLoader from "../components/Loaders/AppLoader.jsx";
import {useSelector} from "react-redux";


const Dashboard = () => {
  const workouts = useSelector(state => state.workouts.workouts)
  const loader = useSelector(state => state.app.appLoader)

  if (loader || !workouts) {
    return (
      <div className={'content center'}>
        <AppLoader/>
      </div>)
  }
  else return (
    <DashboardContent/>
  );
};

export default Dashboard;