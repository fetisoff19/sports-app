import React, {useContext, useMemo, useState} from 'react';
import AppContext from "../../context/AppContext.js";
import ListItem from "./Components/ListItem.js";
import FilterBar from "./Components/FilterBar";

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

  let titles = fields.map((item,index) =>
    <li
      key={index}
      onClick={item !== 'id' || item !== 'name' ? () => {
        sort(item);
        chooseItem(index)
      } : null}
      style=
        {{textAlign:"right",
          width: 150,
          fontWeight: 'bold',
          cursor: 'pointer'}}
    >
      {item === 'name' || item === ' '
        ? item : ((status[index].active ? '\u25B4' : '\u25BE') + item)}
    </li>)

  let list = sortedData
    .map((item, index) =>
      <ListItem key={index} data={item}/>)
  {
    return (

      <>
        <FilterBar data={data} filterSport={filterSport}/>
        <ul style={{display: 'flex',
              listStyleType: "none",
              padding: 0,
              width: '100%'}}
        >{titles}</ul>
        <ul style={{padding: 0}}>{list}</ul>
      </>

    )
  }
}
