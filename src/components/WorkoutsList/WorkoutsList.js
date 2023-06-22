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

  const loader = useSelector(state => state.app.appLoader);
  const userWorkouts = useSelector(state => state.workoutsList.userWorkouts);
  const limit = 15;
  const dispatch = useDispatch();
  const parentRef = useRef();
  const childRef = useRef();
  const [page, setPage] = useState(1)
  const [direction, setDirection] = useState(-1)
  const [chosenField, setChosenField] = useState('timestamp')
  const [sport, setSport] = useState('all')
  const fileLength = useSelector(state => state.workoutsList.fileLength);
  const workoutsLength = useSelector(state => state.workouts.workouts?.length);
  const [search, setSearch] = useState('')
  const [firstLoad, setFirstLoad] = useState(false)
  const stopObserved = (workoutsLength === +fileLength);

  useEffect(() => setFirstLoad(true),[])

  useScroll(parentRef, childRef, stopObserved, 1000, checkNextPage);


  useEffect(() => {
    dispatch(getFiles(sport, chosenField, direction, page, limit, search))
  }, [sport, chosenField, direction, page, limit, search])

  function checkNextPage(){
    if(!stopObserved && !loader){
      setPage(prev => prev + 1)
    }
  }

  let modal = (loader && page === 1 && +userWorkouts?.length)
    ? <div className={styles.modalBackground}/>
      : null

  let noWorkouts = !userWorkouts?.length && !loader &&
    <div className={styles.up}>
      <NoWorkouts/>
    </div>

  let showLoader = loader && page === 1 && +fileLength === 0 && !firstLoad

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
            : userWorkouts.length
              ? <FilterBarTitle/>
                : null}
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
