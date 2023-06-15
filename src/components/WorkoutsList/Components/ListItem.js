import React from 'react';
import {dict, userLang} from "../../../config/config";
import BlockMetricContainer from "./BlockMetricContainer";
import ChangeName from "../../UI/ChangeName";
import styles from '../styles.modules'
import Delete from "../../UI/svgComponents/Delete";
import SportIcon from "../../UI/SportIcon.js";
import {useDispatch} from "react-redux";
import {deleteOneWorkout} from "../../../redux/actions/workouts";


const ListItem = ({data}) => {
  const dispatch = useDispatch();

  return (
    <li className={styles.listItem}>
      <SportIcon className={'icon ' + styles.icon} sport={data.sport} fill={'green'}/>
      <div className={styles.sBlock}  key={data._id + 'timestamp'} >
        <span className={styles.unit}>
          {data.timestamp.getDate() + ' ' + dict.month[data.timestamp.getMonth()][userLang]}
        </span>
        <span className={styles.label}>
          {data.timestamp.getFullYear()}
        </span>
      </div>
      <div className={styles.lBlock} key={data.workoutName}>
        <ChangeName data={data} isLink={true} styles={styles} />
        <div className={styles.label}>
          {dict.sports.hasOwnProperty(data.sport)
            ? dict.sports[data.sport][userLang]
            : dict.sports.other[userLang]}
        </div>
      </div>
      <BlockMetricContainer data={data}/>
      <div key={Math.random()}>
      <div className={styles.xsBlock}
        onClick={() => {
          dispatch(deleteOneWorkout(data._id))
        }}>
        <Delete className={styles.delete} />
      </div>
      </div>
    </li>
  );
};

export default ListItem;