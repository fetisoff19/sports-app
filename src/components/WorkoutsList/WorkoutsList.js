import React from 'react';
import FilterBar from "./Components/FilterBar";
import styles from './styles.modules.scss'
import Titles from "./Components/Titles";
import {dict, userLang} from "../../config/config";
import {useSelector} from "react-redux";
import AppLoader from "../Loaders/AppLoader";
import Workouts from "./Components/Workouts";

export function WorkoutsList() {
  const loader = useSelector(state => state.app.appLoader);

  return (
    <div className={styles.container}>
      <div className={styles.up}>
        <h1>{dict.title.activities[userLang]}</h1>
        <FilterBar/>
        <Titles/>
      </div>
      {loader
        ? <AppLoader/>
        : <div className={styles.down}>
            <ul>
              <Workouts/>
            </ul>
          </div>
      }
    </div>

  )
}
