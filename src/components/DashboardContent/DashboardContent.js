import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import AppContext from "../../context/AppContext.js";
import StartStats from "./components/StartStats";
import Workout from "./components/Workout";
import useScroll from "../../hooks/useScroll";
import './style.css'
import AppLoader from "../Loaders/AppLoader";


const DashboardContent = () => {
  const {workouts} = useContext(AppContext);
  const [wrkuts, setWrkuts] = useState([])
  const [page, setPage] = useState(0);
  const limit = 3;
  const parentRef = useRef();
  const childRef = useRef();
  const intersected = useScroll(parentRef, childRef, () => fetchWorkouts(page, limit));


  // имитация запроса на сервер
  function fetchWorkouts(page, limit) {
    setTimeout(() => {
      if(workouts.length === wrkuts.length) return childRef.current.hidden = true;
      setWrkuts(prev => [...prev, ...workouts.slice(page * limit, (page + 1) * limit)]);
      setPage(prev => prev + 1);
    }, 200)
  }

  return (
    <div ref={parentRef} style={{height: '90vh', overflow: 'auto'}}>
        <div/>
        <div style={{display:"flex"}} >
          <div>
            <div style={{position: "sticky", top: 0}} >
              <StartStats />
            </div>
          </div>
          <div>
            {wrkuts.map((item, index) => <Workout key={index} data={item}/>)}
            <div style={{height: 1}} ref={childRef}></div>
            {workouts.length !== wrkuts.length ? <AppLoader/> : null}
          </div>
        </div>
    </div>
  );
};

export default DashboardContent;