import React, {useContext, useState} from 'react';
import AppContext from "../../context/AppContext.js";
import {dict, userLang} from "../../config/config";
import styles from './styles.module.scss'
import Question from "../UI/svgComponents/Question";

const Settings = () => {
  const {settings, setSettings} = useContext(AppContext)
  const [smoothing, setSmoothing] = useState(settings.smoothing);
  const [language, setLanguage] = useState(settings.language);

  function handlerChange(e) {
    e.preventDefault();
    language && localStorage.setItem('language', language.toString());
    smoothing && localStorage.setItem('smoothing', smoothing.toString());
    language !== settings.language || smoothing !== settings.smoothing
      ? setSettings(prev => ({...prev,
        language: language || prev.language,
        smoothing: smoothing || prev.smoothing,}))
      : null
  }
  //сделать запрос на сервер, чтобы получить настройки пользователя
  return (
    <div className='content'>
      <h1>{dict.title.settings[userLang]}</h1>
      <form className={styles.form} action="" onSubmit={handlerChange}>
        <div>
          <div>
            <label htmlFor="smoothing">{dict.title.smoothing[userLang]}</label>
            <select
              defaultValue={settings?.smoothing || '8'} name="smoothing" id="smoothing"
              onChange={(e) => setSmoothing(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="12">12</option>
              <option value="16">16</option>
            </select>
            <div className={styles.info}>
              <Question stroke={'grey'} height={"20px"} width={'20px'}/>
              <span className={styles.tooltip}>
              {dict.title.settingInfo[userLang]}
            </span>
            </div>
          </div>
          <div>
            <label htmlFor="language">{dict.title.appLanguage[userLang]}</label>
            <select
              defaultValue={settings?.language}
              name="language" id="language"
              onChange={(e) => setLanguage(e.target.value)}>
              <option value='en'>English</option>
              <option value='ru'>Русский</option>
            </select>
            <div className={styles.info}/>
          </div>
          <div>
            <input
              type="submit" value={dict.title.save[userLang]}
              className={(language !== settings.language
                || smoothing !== settings.smoothing) ? styles.active : null}/>
            <div className={styles.info}/>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;