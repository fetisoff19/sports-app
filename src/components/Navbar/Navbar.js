import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import AppContext from "../../context/AppContext.js";

const Navbar = () => {
  const {auth, setAuth} = useContext(AppContext);
  const logout = () => {
    setAuth(false);
    localStorage.removeItem('auth');
  }
  return (
    <header>
      <nav>
        <NavLink to={'/'}>SportsApp</NavLink>
        <NavLink to={'workouts'}>Workouts</NavLink>
        <NavLink to={'add'}>Add</NavLink>
        <NavLink to={'about'}>About</NavLink>
        {auth ? <button onClick={logout}>Out</button> : null}
      </nav>
    </header>
  );
};

export default Navbar;