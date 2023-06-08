import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "../AppRouter/AppRouter.jsx";
import './global.scss';
import {Provider} from "react-redux";
import {store} from "../../reducers";

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </Provider>
  );
}
