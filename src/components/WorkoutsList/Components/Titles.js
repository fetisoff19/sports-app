import React, {useState} from 'react';
import styles from "../styles.modules.scss";
import {dict, userLang} from "../../../config/config";
import Delete from "../../UI/svgComponents/Delete";
import Other from "../../UI/svgComponents/Other";
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../../../redux/actions/workouts";
import {setChosenField, setDirection} from "../../../redux/reducers/workoutsReducer";

//уродливо, но работает. Придумать изящное решение
const Titles = () => {
  const dispatch = useDispatch();
  const chosenField = useSelector(state => state.workouts.chosenField);
  let chosenSport = useSelector(state => state.workouts.chosenSport);
  const direction = useSelector(state => state.workouts.direction);
  const fields = ['totalDistance', 'totalTimerTime', 'enhancedAvgSpeed', 'totalAscent', 'avgHeartRate'];

  function handleClick(field){
    dispatch(getFiles(chosenSport, field, direction))
    dispatch(setChosenField(field))
    dispatch(setDirection())
  }

  const up = ' \u25B4 ';
  const down = ' \u25BE ';

  function setMarker(field){
   if(chosenField !== field) return ''
   return (chosenField === field && Boolean(direction)) ? down : up
  }

  const blockMetric = fields.map(field =>
    <div className={styles.mBlock + ' ' + styles.active}
      key={field} onClick={() => handleClick(field)}>
       {dict.fields[field][userLang]}
      <span className={styles.span}>
        {setMarker(field)}
      </span>
    </div>)

  return (
    <ul>
      <li className={styles.titles}>
        <Other fill={'rgba(0,0,0,0)'} className={'icon ' + styles.icon}/>
        <div onClick={() => handleClick('timestamp')}
          className={styles.sBlock + ' ' + styles.active}>
          <span className={styles.span}>
            {setMarker('timestamp')}
          </span>
          {dict.fields.date[userLang]}
        </div>
        <div className={styles.lBlock}>
          {dict.title.title[userLang]}
        </div>
        <div className={styles.blockMetricContainer}>
          {blockMetric}
        </div>
        <div className={styles.xsBlock}>
          <Delete fill={'rgba(0,0,0,0)'}/>
        </div>
      </li>
    </ul>
  );
};

export default Titles;