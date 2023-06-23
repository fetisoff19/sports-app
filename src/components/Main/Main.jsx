import React, {useEffect} from 'react';
import Navbar from "../Navbar/Navbar.js";
import Footer from "../Footer/Footer.js";
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Error from "../../pages/Error";
import {auth} from "../../redux/actions/user";


const Main = () => {
  const error = useSelector(state => state.app.error)
  const cursorWait = useSelector(state => state.app.cursorWait)
  const dispatch = useDispatch()


  useEffect(() => {
    localStorage.getItem('token')
      ? dispatch(auth())
      : null
  }, [])

  return (
    <>
      <Navbar/>
      {error
      ? <Error error={error}/>
      : <div className={cursorWait ? 'loading' : ''}>
          <Outlet/>
        </div>}
      <Footer/>
    </>
  );
};

export default Main;