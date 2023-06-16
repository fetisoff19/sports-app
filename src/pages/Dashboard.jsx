import React from 'react';
import DashboardContent from "../components/DashboardContent/DashboardContent.js";
import AppLoader from "../components/Loaders/AppLoader.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getFiles} from "../redux/actions/workouts";


const Dashboard = () => {
  const workouts = useSelector(state => state.workouts.workouts)
  const loader = useSelector(state => state.app.appLoader)
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getFiles('all'))
  // }, [])
  //
  // if (loader || !workouts) {
  //   return (
  //     <div className={'content center'}>
  //       <AppLoader/>
  //     </div>)
  // }
  // else
    return (
    <DashboardContent/>
  );
};

export default Dashboard;