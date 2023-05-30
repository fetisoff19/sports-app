import React, {useContext} from 'react';
import AppContext from "../context/AppContext.js";
import AppLoader from "../components/Loaders/AppLoader.jsx";
import {dict, userLang} from "../config/config";

const About = () => {
  const {loading, error, workouts} = useContext(AppContext);

  if (loading) {
    return <AppLoader/>;
  }
  else if (error) {
    console.error(error)
    return <div>Ошибка: {error.message}</div>;
  }
  else if (workouts) {
    return (
      <div className='content about'>
        <h1>
          {dict.title.about[userLang]}
        </h1>
        <p>
          {dict.title.aboutApp1[userLang]}
          <a href='https://drive.google.com/drive/folders/1NCrcDjoPpgEUH09G-hz3cVeMb9vs1rhc?usp=drive_link'>
          {dict.title.link[userLang] + '.'}
          </a>
          {dict.title.aboutApp2[userLang]}
          <a href='https://github.com/fetisoff19/sports-app'>github.com/fetisoff19/sports-app</a>
        </p>
      </div>
    );
  }
};

export default About;