import React, {useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppContext from "./context/AppContext.js";
import {db} from "./API/db.js";
import {changeLanguage} from "./config/config.js";
import useDB from "./hooks/useDB.js";
import AppRouter from "./components/AppRouter/AppRouter.jsx";

export function App() {
  const [auth, setAuth] = useState(false)
  const [random, setRandom] = useState(null)
  const [workouts, loading, error] = useDB(getData, random)
  const [settings, setSettings] = useState({
    language: 'ru',
    smoothing: 8,
  })

  useEffect(() => {
    localStorage.getItem('auth') ? setAuth(true) : null
    return () => {}
  }, [])

  // сделать через localStorage
  changeLanguage(settings.language)
  console.log(workouts, loading, error, random, settings)

  async function getData() {
    return await db.getAll('workouts')
  }

  return (
    <AppContext.Provider value={{random, workouts, setRandom, loading, error, settings, setSettings, auth, setAuth}}>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
