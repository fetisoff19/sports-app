import React, {useContext, useState} from 'react';
import AppContext from "../../context/AppContext.js";
import {dict, userLang} from "../../config/config";

const Settings = () => {
  const {setSettings} = useContext(AppContext)
  const [smoothing, setSmoothing] = useState();
  const [language, setLanguage] = useState();
  function handlerChange(e) {
    e.preventDefault();
    language || smoothing
      ? setSettings(prev => ({...prev,
          language: language || prev.language,
          smoothing: smoothing || prev.smoothing,
      }))
      : null
  }
  console.log(smoothing, language, userLang);
  //сделать запрос на сервер, чтобы получить настройки пользователя
  return (
    <div>
      <form action="" onSubmit={handlerChange}>
        <label htmlFor="smoothing">{dict.ui.smoothing[userLang]}</label>
        <select name="value" id="smoothing" onChange={(e) => setSmoothing(e.target.value)}>
          <option value="">{dict.ui.default[userLang]} 8</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="12">12</option>
          <option value="16">16</option>
        </select>

        <label htmlFor="language">{dict.title.appLanguage[userLang]}</label>
        <select name="value" id="language" onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="ru">Русский</option>
        </select>
        <input type="submit" value="Save" />
      </form>

    </div>
  );
};

export default Settings;