import React from 'react';
import WorkoutName from "../../UI/WorkoutName";
import SportAndDate from "../../UI/SportAndDate";
import {convertDistance, getHourMinSec} from "../../../API/functionsDate&Values";
import {dict, userLang} from "../../../config/config";
import Maps from "../../Maps/Maps";
import styles from '../styles.module.css'
import SportIcon from "../../UI/SportIcon";
import TextArea from "../../UI/TextArea";


const Workout = ({data}) => {

  let indexes = {
    totalDistance: {
      formatter: convertDistance,
      unit: 'km',
    },
    totalAscent: {
      formatter: Math.round,
      unit: 'm',
    },
    totalElapsedTime: {
      formatter: getHourMinSec,
      unit: null,
    },
  };

  let block = ['totalDistance', 'totalAscent', 'totalElapsedTime']
    .map(item => {
      return (
        data[item] ?
        (<div key={item} className={styles.indicator}>
          <div className={styles.unit}>
            {indexes[item].formatter(data[item]) + ' '
              + (indexes[item].unit ? dict.units[indexes[item].unit][userLang] : '')}
          </div>
          <div className={styles.label}>
            {dict.fields[item][userLang]}
          </div>
        </div>)
        : null
      )
    });

  return (
    <div className={styles.workout}>
      <SportIcon className={styles.icon} sport={data.sport} fill={'#414141'} height={'30px'} width={'30px'}/>
      <div className={styles.workoutInfo}>
        <SportAndDate className={styles.date} data={data}/>
        <WorkoutName className={styles.name} data={data}/>
        <div className={styles.aboutWorkout}>
          <TextArea text={data.note} id={data.id} styles={styles}/>
        </div>
        <div className={styles.indicators}>{block}</div>
        {/*Статистика: персональные рекорды...*/}
      </div>
      {data.polylinePoints
        ? <Maps
          polylinePoints={data.polylinePoints}
          startZoom={13}
          maxZoom={19}
          style={{height: 250, width: 200}}
          polylineStyle={{color: 'green'}}
          scrollWheelZoom={false}
        />
        : <div className={styles.plug}>{'no map('}</div>}
    </div>
  );
};

export default Workout;

