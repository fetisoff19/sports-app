import React, {useEffect} from 'react';
import Navbar from "../Navbar/Navbar.js";
import Footer from "../Footer/Footer.js";
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../../redux/actions/workouts";
import Error from "../../pages/Error";
import {auth} from "../../redux/actions/user";
import AppLoader from "../Loaders/AppLoader";


const Main = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth)
  // const workouts = useSelector(state => state.workouts.workouts)
  const error = useSelector(state => state.app.error)

  // console.log(isAuth, localStorage.getItem('token'))
  useEffect(() => {
    localStorage.getItem('token')
      ? dispatch(auth())
      : null
  }, [])

  // useEffect(() => {
  //   if (isAuth) {
  //     dispatch(getFiles('all'))
  //   }
  // }, [isAuth])

  return (
    <>
      <Navbar/>
      {error
      ? <Error error={error}/>
      : <div>
          <Outlet/>
        </div>}
      <Footer/>
    </>
  );
};

export default Main;