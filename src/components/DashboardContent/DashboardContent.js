import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import AppContext from "../../context/AppContext.js";
import StartStats from "./components/StartStats";
import Workout from "./components/Workout";
import useScroll from "../../hooks/useScroll";
import styles from './styles.module.css'
import AppLoader from "../Loaders/AppLoader";


const DashboardContent = () => {
  const {workouts} = useContext(AppContext);
  const [trainings, setTrainings] = useState([])
  const [page, setPage] = useState(0);
  const limit = 3;
  const parentRef = useRef();
  const childRef = useRef();
  const intersected = useScroll(parentRef, childRef, () => fetchWorkouts(page, limit));


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
        <div/>
        <div className={styles.container} >
          <div>
            <div className={styles.stats} >
              <StartStats />
            </div>
          </div>
          <div className={styles.workouts}>
            {trainings.map((item, index) => <Workout key={index} data={item}/>)}
            <div ref={childRef}></div>
            {workouts.length !== trainings.length ? <AppLoader/> : null}
          </div>
        </div>
    </div>
  );
};

export default DashboardContent;