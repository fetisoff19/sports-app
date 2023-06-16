import React, {useEffect, useState} from 'react';
import FilterBar from "./Components/FilterBar";
import styles from './styles.modules.scss'
import Titles from "./Components/Titles";
import {dict, userLang} from "../../config/config";
import {useDispatch, useSelector} from "react-redux";
import AppLoader from "../Loaders/AppLoader";
import Workouts from "./Components/Workouts";
import {getFiles} from "../../redux/actions/workouts";
import useScroll from "../../hooks/useScroll";
import {useRef} from "react";
import NoWorkouts from "../NoWorkouts/NoWorkouts";

export function WorkoutsList() {

  const loader = useSelector(state => state.app.appLoader);
  const userWorkouts = useSelector(state => state.workoutsList.userWorkouts);
  const limit = 30;
  const dispatch = useDispatch();
  const parentRef = useRef();
  const childRef = useRef();
  const [page, setPage] = useState(1)
  const [direction, setDirection] = useState(-1)
  const [chosenField, setChosenField] = useState('timestamp')
  const [sport, setSport] = useState('all')
  const fileLength = useSelector(state => state.workoutsList.fileLength);
  const workoutsLength = useSelector(state => state.workouts.workouts?.length);
  const [check, setCheck] = useState(0)
  let stopObserved = workoutsLength === +fileLength;

  useScroll(parentRef, childRef, stopObserved, 1000, checkNextPage);

  useEffect(() => {
    dispatch(getFiles(sport, chosenField, direction, page, limit))
  }, [sport, chosenField, direction, page, limit])

  function checkNextPage(){
    setCheck(prev => prev + 1)
    if(!stopObserved && !loader){
      setPage(prev => prev + 1)
    }
  }


  let modal = (loader && page === 1 && +userWorkouts?.length) ? <div
    className={styles.modalBackground}/> : null

  let noWorkouts = !userWorkouts?.length && !loader &&
    <div className={styles.up}>
      <NoWorkouts/>
    </div>

  return (
    <>
      {modal}
      <div className={styles.container} ref={parentRef}>
        {noWorkouts}
        {loader && page === 1 && +fileLength === 0
          ? <AppLoader/>
          : userWorkouts.length
            ? <div className={styles.up}>
              <h1>{dict.title.activities[userLang]
                // + ' stopObserved ' + stopObserved + ' page ' + page + ' fileLength ' + fileLength + ' workoutsLength ' + workoutsLength + ' check ' + check + ' loader ' + loader
              }</h1>
              <FilterBar
                setPage={setPage}
                sport={sport} setSport={setSport}
                setDirection={setDirection}
                setChosenField={setChosenField}/>
              <Titles
                setPage={setPage}
                direction={direction}
                setDirection={setDirection}
                chosenField={chosenField}
                setChosenField={setChosenField}/>
            </div>
            : null}
        <div className={styles.down}>
          <ul>
            <Workouts page={page}/>
          </ul>
        </div>
        <div ref={childRef} className={'childRef'}></div>
      </div>
    </>
  )
}
