import React, {useEffect} from 'react';
import Navbar from "../Navbar/Navbar.js";
import Footer from "../Footer/Footer.js";
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getWorkouts} from "../../redux/actions/workouts";
import Error from "../../pages/Error";


const Main = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth)
  // const workouts = useSelector(state => state.workouts.workouts)
  // const loader = useSelector(state => state.app.loader)
  const error = useSelector(state => state.app.error)

  useEffect(() => {
    isAuth ?
    dispatch(getWorkouts())
      : null
  }, [isAuth])

  return (
    <>
      <Navbar/>
      {error
        ? <Error error={error}/>
        : <Outlet/>
      }
      <Footer/>
    </>
  );
};

export default Main;