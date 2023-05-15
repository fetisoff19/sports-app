import React from 'react';
import Navbar from "../Navbar/Navbar.js";
import Footer from "../Footer/Footer.js";
import {Outlet} from "react-router-dom";


const Main = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  );
};

export default Main;