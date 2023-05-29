import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import AppContext from "../../context/AppContext.js";
import {dict, userLang} from "../../config/config";

const Navbar = () => {
  const {auth, setAuth} = useContext(AppContext);
  const logout = () => {
    setAuth(false);
    localStorage.removeItem('auth');
  }
  return (
    <header>
      <nav>
        <NavLink to={'/'} className={'logo'}>SportsApp</NavLink>
        <NavLink
          to={'/'} end
          className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""}
        >
          {dict.title.dashBoard[userLang]}
        </NavLink>
        <NavLink to={'workouts'} className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""}
        >
          {dict.title.activities[userLang]}
        </NavLink>
        <NavLink to={'add'}  className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }>{dict.ui.add[userLang]}</NavLink>
        <NavLink to={'settings'}  className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }>{dict.title.settings[userLang]}</NavLink>
        <NavLink to={'about'}  className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }>{dict.title.about[userLang]}</NavLink>
      </nav>
      {auth ? <a onClick={logout}>{dict.title.out[userLang]}</a> : null}
    </header>
  );
};

export default React.memo(Navbar);