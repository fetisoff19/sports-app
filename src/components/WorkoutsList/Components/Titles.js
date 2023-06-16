import React, {useEffect} from 'react';
import styles from "../styles.modules.scss";
import {dict, userLang} from "../../../config/config";
import Delete from "../../UI/svgComponents/Delete";
import Other from "../../UI/svgComponents/Other";
import {useDispatch, useSelector} from "react-redux";


const Titles = ({direction, setDirection, chosenField, setChosenField, setPage}) => {
  const userWorkouts = useSelector(state => state.workoutsList.userWorkouts);
  const fields = ['totalDistance', 'totalTimerTime', 'enhancedAvgSpeed', 'totalAscent', 'avgHeartRate'];
  const up = ' \u25B4 ';
  const down = ' \u25BE ';

  const blockMetric = fields.map(field =>
    <div className={styles.mBlock + ' ' + styles.active}
         onClick={() => handleClick(field)}
         key={field} >
      {dict.fields[field][userLang]}
      <span className={styles.span}>
        {setMarker(field)}
      </span>
    </div>)

  useEffect(() => {
    setPage(1)
  }, [chosenField, direction])

  function handleClick(field){
    setDirection(prev => prev > 0 ? -1 : 1)
    setChosenField(field)
  }

  function setMarker(field){
   if(chosenField !== field) return ''
   return (chosenField === field && direction < 0) ? down : up
  }

  if(userWorkouts.length) {
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
    )
  } else return <div></div>
};

export default Titles;