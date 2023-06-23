import React, {useEffect, useState} from 'react';
import styles from './styles.modules.scss'
import {useDispatch, useSelector} from "react-redux";
import AppLoader from "../Loaders/AppLoader";
import Workouts from "./Components/Workouts";
import {getFiles} from "../../redux/actions/workouts";
import useScroll from "../../hooks/useScroll";
import {useRef} from "react";
import NoWorkouts from "../NoWorkouts/NoWorkouts";
import FilterBarTitle from "./Components/FilterBarTitle.js";
import WorkoutsListContext from "./context/Context";

export function WorkoutsList() {
  const [chosenField, setChosenField] = useState('timestamp')
  const [sport, setSport] = useState('all')
  const [search, setSearch] = useState('')
  const [firstLoad, setFirstLoad] = useState(false)

  const [direction, setDirection] = useState(-1)
  const [page, setPage] = useState(1)
  const limit = 20;
  const numberOfFiles = useSelector(state => state.workouts.numberOfFiles);
  const workoutsLength = useSelector(state => state.workouts.workouts?.length);
  const userWorkouts = useSelector(state => state.workoutsList.userWorkouts);
  const stats = useSelector(state => state.workouts.stats);
  const loader = useSelector(state => state.app.appLoader);

  const parentRef = useRef();
  const childRef = useRef();
  const dispatch = useDispatch();

  const stopObserved = (workoutsLength === +numberOfFiles);
  useScroll(parentRef, childRef, stopObserved, 1000, checkNextPage);

  console.log(workoutsLength, numberOfFiles)
  useEffect(() => {
    let sportType = sport !== 'all' && stats.sports[sport] === 0 ? 'all' : sport;
    console.log(sportType, chosenField, direction, page, limit, search)
    dispatch(getFiles(sport, chosenField, direction, page, limit, search))
  }, [sport, chosenField, direction, page, limit, search])

  useEffect(() => setFirstLoad(true),[])

  function checkNextPage(){
    if(!stopObserved && !loader){
      setPage(prev => prev + 1)
    }
  }

  const modal = (loader && page === 1 && +userWorkouts?.length > 0)
    && <div className={styles.modalBackground}/>

  const noWorkouts = !userWorkouts?.length > 0 && !loader
    && <div className={styles.up}>
         <NoWorkouts/>
       </div>

  const showLoader = loader && page === 1 && +numberOfFiles === 0 && !firstLoad

  return (
    <WorkoutsListContext.Provider value={{
      sport, setSport, setPage,
      direction, setDirection,
      chosenField, setChosenField,
      search, setSearch
    }}>
      {modal}
      <div className={styles.container} ref={parentRef}>
        {noWorkouts}
        {showLoader
          ? <AppLoader/>
            : <FilterBarTitle/>}
        <div className={styles.down}>
          <ul>
            <Workouts page={page} search={search}/>
          </ul>
          <div ref={childRef} className={'childRef'}/>
        </div>
      </div>
    </WorkoutsListContext.Provider>
  )
}
