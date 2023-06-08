import React from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../../router";
import PrivateMain from "../MainPages/PrivateMain.jsx";
import {Navigate} from "react-router";
import {useSelector} from "react-redux";
import PublicMain from "../MainPages/PublicMain.jsx";

const AppRouter = () => {
  const isAuth = useSelector(state => state.user.isAuth)

  return (
    isAuth
    ? (
      <Routes>
        <Route path={'/'} element={<PrivateMain/>}>
          {privateRoutes.map(route =>
            <Route
              path={route?.path}
              element={route?.navigate ? <Navigate to='/'/> : <route.element/>}
              index={route?.index}
              key={route.path || route?.index}
            />)}
        </Route>
      </Routes>
    )
    : (
      <Routes>
        <Route path={'/'} element={<PublicMain/>}>
          {publicRoutes.map(route =>
            <Route
              path={route.path}
              element={route?.navigate ? <Navigate to='/'/> : <route.element/>}
              index={route?.index}
              key={route.path + 1}
            />)}
        </Route>
      </Routes>
    )
  );
};

export default AppRouter;