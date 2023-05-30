import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../../router";
import AppContext from "../../context/AppContext.js";
import AppLoader from "../Loaders/AppLoader.jsx";
import Main from "../Main/Main.jsx";
import {Navigate} from "react-router";

const AppRouter = () => {
  const {auth, loading,} = useContext(AppContext);

  return (
    loading
    ? <AppLoader/>
    : auth
    ? (
      <Routes>
        <Route path={'/'} element={<Main/>}>
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
        <Route path={'/'} element={<Main/>}>
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