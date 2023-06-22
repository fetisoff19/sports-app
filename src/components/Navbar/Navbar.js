import React from 'react';
import {NavLink} from "react-router-dom";
import {dict} from "../../config/config";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/reducers/userReducer";

const Navbar = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth)
  const language = useSelector(state => state.settings.language)

  const logoutHandlerClick = () => {
    dispatch(logout())
  }

  if(isAuth) {
    return (
      <header>
        <nav>
          <NavLink to={'/'} className={'logo'}>
            SportsApp
          </NavLink>
          <NavLink
            to={'/'} end
            className={({isActive, isPending}) =>
              isPending ? "pending" : isActive ? "active" : ""}>
            {dict.title.dashBoard[language]}
          </NavLink>
          <NavLink
            to={'workouts'}
            className={({isActive, isPending}) =>
              isPending ? "pending" : isActive ? "active" : ""}>
            {dict.title.activities[language]}
          </NavLink>
          <NavLink
            to={'add'}
            className={({isActive, isPending}) =>
            isPending ? "pending" : isActive ? "active" : ""}>
            {dict.title.add[language]}
          </NavLink>
          <NavLink
            to={'settings'}
            className={({isActive, isPending}) =>
              isPending ? "pending" : isActive ? "active" : ""}>
            {dict.title.settings[language]}</NavLink>
          <NavLink to={'about'} className={({isActive, isPending}) =>
            isPending ? "pending" : isActive ? "active" : ""}>
            {dict.title.about[language]}
          </NavLink>
        </nav>
        <a className={'out'} onClick={logoutHandlerClick}>
          {dict.title.out[language]}
        </a>
      </header>
    )
  }
  else return (
    <header>
      <nav>
        <NavLink
          to={'/'} className={'logo'}>
          SportsApp
        </NavLink>
        <NavLink
          to={'about'} className={({isActive, isPending}) =>
          isPending ? "pending" : isActive ? "active" : ""}>
          {dict.title.about[language]}
        </NavLink>
      </nav>
      <div>
        <NavLink
          to={'login'}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""}>
          {dict.title.signIn[language]}
        </NavLink>
        <NavLink
          to={'registration'}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""}>
          {dict.title.registration[language]}
        </NavLink>
      </div>
    </header>
  );
};

export default React.memo(Navbar);