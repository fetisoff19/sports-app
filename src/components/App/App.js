import React, {useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppContext from "../../context/AppContext.js";
import {db} from "../../API/db.js";
import {changeLanguage, userLang} from "../../config/config.js";
import useDB from "../../hooks/useDB.js";
import AppRouter from "../AppRouter/AppRouter.jsx";
import './global.scss';

export function App() {
  const [auth, setAuth] = useState(false)
  const [random, setRandom] = useState(null)
  const [workouts, loading, error] = useDB(getData, random)
  const [settings, setSettings] = useState({
    language: localStorage.getItem('language') || 'ru',
    smoothing: localStorage.getItem('smoothing') || 8,
  })

  useEffect(() => {
    localStorage.getItem('auth') ? setAuth(true) : null
    return () => {}
  }, [])

  settings.language !== userLang ? changeLanguage(settings.language) : null;

  async function getData() {
   return await db.getAll('workouts')
      .then(r => r.sort((a, b) => b.timestamp - a.timestamp))
  }

  return (
    <AppContext.Provider value={{random, workouts, setRandom, loading, error, settings, setSettings, auth, setAuth}}>
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
    </AppContext.Provider>
  );
}
