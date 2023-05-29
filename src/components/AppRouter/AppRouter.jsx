import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../../router";
import AppContext from "../../context/AppContext.js";
import AppLoader from "../Loaders/AppLoader.jsx";
import Main from "../Main/Main.jsx";

const AppRouter = () => {
  const {auth, loading, error} = useContext(AppContext);

  return (
    loading
    ? <AppLoader/>
     // : error
     //    ? <h1>Ошибкааа</h1>
    : auth
    ? (
      <Routes>
        <Route path={'/'} element={<Main/>}>
          {privateRoutes.map(route =>
            <Route
              path={route?.path}
              element={<route.element/>}
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
              element={<route.element/>}
              index={route?.index}
              key={route.path + 1}
            />)}
        </Route>
      </Routes>
    )
  );
};

export default AppRouter;