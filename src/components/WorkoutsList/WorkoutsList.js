import React, {useContext, useEffect, useMemo, useState} from 'react';
import AppContext from "../../context/AppContext.js";
import ListItem from "./Components/ListItem.js";
import FilterBar from "./Components/FilterBar";
import styles from './styles.modules.scss'
import Titles from "./Components/Titles";
import {dict, userLang} from "../../config/config";
import NoWorkouts from "../NoWorkouts/NoWorkouts";

const fields = ['id', 'sport', 'timestamp', 'name',  'totalDistance', 'totalTimerTime', 'enhancedAvgSpeed', 'totalAscent', 'avgHeartRate', ' '];

export function WorkoutsList() {
  const {workouts, setRandom} = useContext(AppContext)
  const [order, setOrder] = useState(true);
  const [changed, setChanged] = useState(false);
  const [status, setStatus] = useState(fields.map(() => {return {active: false}}));
  const chooseItem = (id) => {
    const newArr = status.map((item, i) =>
      i === id ? {active: !item.active} : item
    );
    setStatus(newArr);
  };

  const data = useMemo(() => {
    let result = [];
    workouts.forEach(workout => {
      let obj = {};
      fields.forEach(item => obj[item] =
        workout[item] || null);
      result.push(obj)
    })
    return result
  }, [workouts]);

  const [trainings, setTrainings] = useState(data)
  const [sortedData, setSortedData] = useState(trainings);


  function sort(key){
    let newItems = sortedData.concat();

    if(order) {
      newItems = newItems.sort((a, b) => a[key] - b[key] )
      setSortedData(newItems);
      setOrder(prev => !prev)
    }
    if(!order) {
      newItems = newItems.sort((a, b) => b[key] - a[key] )
      setSortedData(newItems);
      setOrder(prev => !prev)
    }
  }

  function filterSport(sport) {
    setStatus(fields.map(() => {return {active: false}}));
    sport === 'all'
      ? setSortedData(trainings)
      : setSortedData(trainings.filter(item => item.sport === sport));
  }

  function handleTitleClick(item,index){
    sort(item);
    chooseItem(index)
  }

  useEffect(() => {
    return data?.length !== trainings?.length
      ? () => setChanged(true) : () => {};
  },[trainings])

  useEffect(() => {
    return changed ? () => setRandom(Math.random()) : () => {};
  },[changed])

  let list = sortedData
    .map((item, index) =>
      <ListItem
        key={index} i={index} data={item}
        index={trainings.findIndex(elem => elem.id === item.id)}
        setSortedData={setSortedData} setTrainings={setTrainings}/>)

  return (
    workouts.length ?
    <div className={styles.container}>
      <div className={styles.up}>
        <h1>{dict.title.activities[userLang]}</h1>
        <FilterBar data={data} filterSport={filterSport}/>
        <Titles status={status} f={handleTitleClick}/>
      </div>
      <div className={styles.down}>
        <ul>{list}</ul>
      </div>
    </div>
    : <NoWorkouts/>
  )
}
