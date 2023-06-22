import React from 'react';
import WorkoutName from "../../UI/WorkoutName";
import SportAndDate from "../../UI/SportAndDate";
import styles from '../styles.module.scss'
import SportIcon from "../../UI/SportIcon";
import TextArea from "../../UI/TextArea";
import Map from "./Map";
import Indicators from "./Indicators";

const Workout = ({data}) => {

  return (
    <div className={styles.workout}>
      <SportIcon className={styles.icon} sport={data.sport} fill={'#414141'} height={'30px'} width={'30px'}/>
      <div className={styles.workoutInfo}>
        <SportAndDate className={styles.date} data={data}/>
        <WorkoutName className={styles.name} data={data}/>
        <Indicators data={data}/>
        <div className={styles.aboutWorkout}>
          <TextArea text={data.note} _id={data._id} styles={styles}/>
        </div>
        {/*Статистика: персональные рекорды...*/}
      </div>
      <Map id={data?.polyline}/>
    </div>
  );
};

export default React.memo(Workout);

