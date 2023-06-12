import React from 'react';
import {dict, userLang} from "../../../config/config";
import BlockMetricContainer from "./BlockMetricContainer";
import ChangeName from "../../UI/ChangeName";
import styles from '../styles.modules'
import Delete from "../../UI/svgComponents/Delete";
import SportIcon from "../../UI/SportIcon.js";
import {useDispatch} from "react-redux";
import {deleteOneWorkout} from "../../../redux/actions/workouts";


const ListItem = ({data, setTrainings, setSortedData, index, i}) => {
  const dispatch = useDispatch();

  return (
    <li className={styles.listItem}>
      <div className={styles.xsBlock + ' ' +  styles.unit}  key={data._id}>
        <span className={styles.unit}>{data._id}</span>
        <span className={styles.label}>id</span>
      </div>
      <SportIcon className={'icon'} sport={data.sport} fill={'green'}/>
      <div className={styles.sBlock}  key={data._id + 'timestamp'} >
        <span className={styles.unit}>
          {data.timestamp.getDate() + ' ' + dict.month[data.timestamp.getMonth()][userLang]}
        </span>
        <span className={styles.label}>
          {data.timestamp.getFullYear()}
        </span>
      </div>
      <div className={styles.lBlock} key={data.name}>
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
          dispatch(deleteOneWorkout(data._id)).then(r => {
            if(r === 'OK') {
              setTrainings(prev => [...prev.slice(0, index),
                ...prev.slice(index + 1)]);
              setSortedData(prev => [...prev.slice(0, i),
                ...prev.slice(i + 1)]);
            }
          })
        }}>
        <Delete className={styles.delete} />
      </div>
      </div>
    </li>
  );
};

export default ListItem;