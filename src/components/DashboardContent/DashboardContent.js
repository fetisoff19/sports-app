import React, {useRef, useState} from 'react';
import StartStats from "./components/StartStats";
import Workout from "./components/Workout";
import useScroll from "../../hooks/useScroll";
import styles from './styles.module.scss'
import AppLoader from "../Loaders/AppLoader";
import NoWorkouts from "../NoWorkouts/NoWorkouts";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getFiles} from "../../redux/actions/workouts";
import ThreeDotsLoader from "../Loaders/ThreeDotsLoader";

const DashboardContent = () => {
  const loader = useSelector(state => state.app.appLoader);
  const workouts = useSelector(state => state.workouts.workouts);
  const limit = 10;
  const dispatch = useDispatch();
  const parentRef = useRef();
  const childRef = useRef();
  const [page, setPage] = useState(1)
  const fileLength = useSelector(state => state.workoutsList.fileLength);
  const workoutsLength = useSelector(state => state.workouts.workouts?.length);
  const stopObserved = workoutsLength === +fileLength;

  useScroll(parentRef, childRef, stopObserved, 1000, checkNextPage);

  function checkNextPage(){
    if(!stopObserved && !loader){
      setPage(prev => prev + 1)
    }
  }

  useEffect(() => {
    dispatch(getFiles('all', 'timestamp', -1, page, limit))
  }, [page, limit])

  let list = workouts?.map(item =>
    <Workout key={item.timestamp} data={item}/>);
  let smallLoader = loader && page > 1
    && <ThreeDotsLoader className={styles.smallLoader}/>

  return (
    <div ref={parentRef} className={styles.page}>
      {loader && page === 1
        ? <AppLoader/>
        : workouts?.length
        ? (<div className={styles.container}>
            <div>
              <div className={styles.stats}>
                <StartStats text={''
                  // '+ stopObserved ' + stopObserved + ' page ' + page + ' fileLength ' + fileLength + ' workoutsLength ' + workoutsLength + ' loader ' + loader

                }/>
              </div>
            </div>
            <div>
              {list}
              {smallLoader}
            </div>
          </div>)
        : <NoWorkouts/>}
        <div ref={childRef} className={'childRef'}/>
    </div>
  );
};

export default DashboardContent;