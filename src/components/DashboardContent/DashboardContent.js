import React, {useContext, useRef, useState} from 'react';
import AppContext from "../../context/AppContext.js";
import StartStats from "./components/StartStats";
import Workout from "./components/Workout";
import useScroll from "../../hooks/useScroll";
import styles from './styles.module.scss'
import AppLoader from "../Loaders/AppLoader";
import NoWorkouts from "../NoWorkouts/NoWorkouts";
import {useSelector} from "react-redux";


const DashboardContent = () => {
  const [trainings, setTrainings] = useState([])
  const [page, setPage] = useState(0);
  const limit = 3;
  const parentRef = useRef();
  const childRef = useRef();
  const intersected = useScroll(parentRef, childRef, () => fetchWorkouts(page, limit));

  const workouts = useSelector(state => state.workouts.workouts)

  // имитация запроса на сервер
  function fetchWorkouts(page, limit) {
    setTimeout(() => {
      if(workouts.length === trainings.length) return childRef.current.hidden = true;
      setTrainings(prev => [...prev, ...workouts.slice(page * limit, (page + 1) * limit)]);
      setPage(prev => prev + 1);
    }, 200)
  }

  return (
    <div ref={parentRef} className={styles.page}>
      {workouts.length ?
        <div className={styles.container}>
        <div>
          <div className={styles.stats}>
            <StartStats/>
          </div>
        </div>
        <div>
          {trainings.map((item, index) => <Workout key={index} data={item}/>)}
          <div ref={childRef}></div>
          {workouts.length !== trainings.length
            ? <div className={styles.loader}><AppLoader/></div>
            : null}
        </div>
      </div>
      : <NoWorkouts childRef={childRef}/> }
    </div>
  );
};

export default DashboardContent;