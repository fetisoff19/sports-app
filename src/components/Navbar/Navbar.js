import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import AppContext from "../../context/AppContext.js";
import {dict, userLang} from "../../config/config";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/reducers/userReducer";

const Navbar = () => {
  // const {auth, setAuth} = useContext(AppContext);
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth)
  const language = useSelector(state => state.settings.language)

  const logoutHandlerClick = () => {
    dispatch(logout())
    // setAuth(false);
    // localStorage.removeItem('auth');
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
          {dict.title.dashBoard[language]}
        </NavLink>
        <NavLink to={'workouts'} className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""}
        >
          {dict.title.activities[language]}
        </NavLink>
        <NavLink to={'add'}  className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }>{dict.title.add[language]}</NavLink>
        <NavLink to={'settings'}  className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }>{dict.title.settings[language]}</NavLink>
        <NavLink to={'about'}  className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }>{dict.title.about[language]}</NavLink>
      </nav>
      {isAuth
        ? <a className={'out'} onClick={logoutHandlerClick}>{dict.title.out[language]}</a>
        : <>
            <NavLink to={'registration'} className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }>{'Регистрация'}</NavLink>
            <NavLink to={'login'} className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }>{'Войти'}</NavLink>
        </>
      }
    </header>
  );
};

export default React.memo(Navbar);