import React from 'react';
import WorkoutName from "../../UI/WorkoutName";
import SportAndDate from "../../UI/SportAndDate";
import {convertDistance, getHourMinSec} from "../../../API/functionsDate&Values";
import {dict, userLang} from "../../../config/config";
import Maps from "../../Maps/Maps";
import styles from '../styles.module.scss'
import SportIcon from "../../UI/SportIcon";
import TextArea from "../../UI/TextArea";


const Workout = ({data}) => {

  let fields = {
    totalDistance: {
      formatter: convertDistance,
      unit: 'km',
    },
    totalElapsedTime: {
      formatter: getHourMinSec,
      unit: null,
    },
    totalAscent: {
      formatter: Math.round,
      unit: 'm',
    },
  };

  let block = ['totalDistance', 'totalElapsedTime', 'totalAscent',]
    .map(item => {
      return (
        data[item] ?
        (<div key={item} className={styles.indicator}>
          <div className={styles.unit}>
            {fields[item].formatter(data[item]) + ' '
              + (fields[item].unit ? dict.units[fields[item].unit][userLang] : '')}
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
        <div className={styles.indicators}>{block}</div>
        <div className={styles.aboutWorkout}>
          <TextArea text={data.note} _id={data._id} styles={styles}/>
        </div>
        {/*Статистика: персональные рекорды...*/}
      </div>
      {data.polyline?.length
        ? <Maps
          polylinePoints={data.polyline}
          startZoom={13}
          maxZoom={19}
          style={{height: 200, width: 200}}
          polylineStyle={{color: 'green'}}
          scrollWheelZoom={false}
        />
        : <div className={styles.plug}>{dict.title.indoorWorkout[userLang]}</div>}
    </div>
  );
};

export default Workout;

