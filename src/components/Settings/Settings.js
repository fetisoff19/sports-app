import React, {useContext, useState} from 'react';
import AppContext from "../../context/AppContext.js";
import {dict, userLang} from "../../config/config";
import styles from './styles.module.scss'
import Question from "../UI/svgComponents/Question";
import {deleteWorkout} from "../../API/db";
import {useDispatch, useSelector} from "react-redux";
import {setFunnyMarkers, setLanguage, setSmoothing} from "../../redux/reducers/settingsReducer";
import {deleteAllWorkouts, deleteUserFiles} from "../../redux/actions/workouts";
import AppLoader from "../Loaders/AppLoader";

const Settings = () => {
  const [clickButtonDeleteAll, setClickButtonDeleteAll] = useState(false)

  const dispatch = useDispatch()
  const workouts = useSelector(state => state.workouts.workouts)
  const language = useSelector(state => state.settings.language)
  const smoothing = useSelector(state => state.settings.smoothing)
  const funnyMarkers = useSelector(state => state.settings.funnyMarkers)
  const loader = useSelector(state => state.app.appLoader)

  const [lang, setLang] = useState(language);
  const [smooth, setSmooth] = useState(smoothing);
  const [funnyMarks, setFunnyMarks] = useState(funnyMarkers);
  const [stylesActive, setStylesActive] = useState(false);


  function setLanguageHandler(e){
    setLang(e.target.value);
    setStylesActive(true);
  }

  function setSmoothingHandler(e){
    setSmooth(e.target.value);
    setStylesActive(true);
  }

  function setFunnyMarkersHandler(){
    setFunnyMarks(prev => !prev);
    setStylesActive(true);
  }

  function handleChange() {
    dispatch(setLanguage(lang));
    dispatch(setSmoothing(smooth));
    dispatch(setFunnyMarkers(funnyMarks));
    setStylesActive(false);
    // setRandom(Math.random());
  }

   function deleteAll(){
     dispatch(deleteAllWorkouts(workouts))
     setClickButtonDeleteAll(false)
       // .then((r) => r === 'OK' ? setClickButtonDeleteAll(false) : null);
  }

  function deleteUser(){
    dispatch(deleteUserFiles())
    setClickButtonDeleteAll(false)
    // .then((r) => r === 'OK' ? setClickButtonDeleteAll(false) : null);
  }


  if(loader){
    return <AppLoader/>
  } else return (
    <div className={styles.page}>
      <div
        className={clickButtonDeleteAll
          ? styles.modalBackground
          : (styles.modalBackgroundHidden)}>
        <div className={clickButtonDeleteAll ? styles.modal : null}>
          <h3>{dict.title.deleteAllWorkouts[userLang]}</h3>
          <div>
            <button
              onClick={deleteAll}
              className={styles.active}>
              {dict.title.yes[userLang]}
            </button>
            <button
              onClick={() => setClickButtonDeleteAll(false)}
              className={styles.active + ' ' + styles.no}>
              {dict.title.no[userLang]}
            </button>
          </div>
        </div>
      </div>
      <div className={'content'}>
        <h1>{dict.title.settings[userLang]}</h1>
        <form className={styles.form} action="" onSubmit={e => e.preventDefault()}>
          <div>
            <div>
              <label htmlFor="smoothing">{dict.title.smoothing[userLang]}</label>
              <select
                defaultValue={smooth} name="smoothing" id="smoothing"
                onChange={setSmoothingHandler}>
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
              <label className={styles.customInputLabel} htmlFor="markers">
                {dict.title.funnyMarkers[userLang]}
              <input
                type="checkbox" id="markers" name="markers"
                checked={funnyMarks}
                onChange={setFunnyMarkersHandler}/>
              <span className={styles.customInput}></span>
              </label>
                <div className={styles.info}/>
            </div>
            <div>
              <label htmlFor="language">{dict.title.appLanguage[userLang]}</label>
              <select
                defaultValue={language}
                name="language" id="language"
                onChange={setLanguageHandler}>
                <option value='en'>English</option>
                <option value='ru'>Русский</option>
              </select>
              <div className={styles.info}/>
            </div>
            <div>
              <button
                onClick={handleChange}
                value={dict.title.save[userLang]}
                className={stylesActive ? styles.active : ''}>
                {dict.title.save[userLang]}
              </button>
              <div className={styles.info}/>
            </div>
            <div>
              <button
                className={workouts?.length ? styles.active : null}
                onClick={() => workouts?.length ? setClickButtonDeleteAll(true) : null}
              >
                {dict.title.deleteAll[userLang]}
              </button>
              <div className={styles.info}/>
            </div>
            <div>
              <button
                // className={workouts?.length ? styles.active : null}
                // onClick={() => workouts?.length ? setClickButtonDeleteAll(true) : null}
                onClick={deleteUser}
              >
                Удалить юзера?
                {/*{dict.title.deleteAll[userLang]}*/}
              </button>
              <div className={styles.info}/>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;