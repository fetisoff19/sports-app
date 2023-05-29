import React, {useContext, useMemo, useState} from 'react';
import AppContext from "../../context/AppContext.js";
import ListItem from "./Components/ListItem.js";
import FilterBar from "./Components/FilterBar";
import styles from './styles.modules.scss'
import Titles from "./Components/Titles";
import {dict, userLang} from "../../config/config";
import NoWorkouts from "../NoWorkouts/NoWorkouts";

const fields = ['id', 'sport', 'timestamp', 'name',  'totalDistance', 'totalTimerTime', 'enhancedAvgSpeed', 'totalAscent', 'avgHeartRate', ' '];

export function WorkoutsList() {
  const {workouts} = useContext(AppContext)
  const [order, setOrder] = useState(true);
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

  const [sortedData, setSortedData] = useState(data);

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
      ? setSortedData(data)
      : setSortedData(data.filter(item => item.sport === sport));
  }

  function handleTitleClick(item,index){
    sort(item);
    chooseItem(index)
  }

  let list = sortedData
    .map((item, index) =>
      <ListItem key={index} data={item}/>)

    return (
      workouts.length ?
      <div className={styles.container}>
        <h1>{dict.title.activities[userLang]}</h1>
        <FilterBar data={data} filterSport={filterSport}/>
        <Titles status={status} f={handleTitleClick}/>
        <ul>{list}</ul>
      </div>
      : <NoWorkouts/>
    )
}
