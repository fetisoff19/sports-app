import React, {useState} from 'react';
import {dict, userLang} from "../../../config/config";
import BlockMetricContainer from "./BlockMetricContainer";
import ChangeName from "../../UI/ChangeName";
import styles from '../styles.modules'
import Delete from "../../UI/svgComponents/Delete";
import SportIcon from "../../UI/SportIcon.js";
import {useDispatch, useSelector} from "react-redux";
import {deleteOneWorkout} from "../../../redux/actions/workouts";
import AppLoader from "../../Loaders/AppLoader";
import {auth} from "../../../redux/actions/user";


const ListItem = ({data}) => {
  const [clicked, setClicked] = useState(false)
  const dispatch = useDispatch();

  function deleteWorkout(id){
    if(!clicked) {
      setClicked(true)
      dispatch(deleteOneWorkout(id, 'delete'))
    }
  }
  let smallLoader = useSelector(state => state.app.smallLoader);
  let smallLoaderId = useSelector(state => state.app.smallLoaderId);

  return (
    <li className={styles.listItem}>
      <SportIcon className={'icon ' + styles.icon} sport={data.sport} fill={'green'}/>
      <div className={styles.sBlock}  key={data._id + 'timestamp'} >
        <span className={styles.unit}>
          {new Date(data?.timestamp).getDate() + ' ' + dict.month[new Date(data?.timestamp).getMonth()][userLang]}
        </span>
        <span className={styles.label}>
          {new Date(data?.timestamp).getFullYear()}
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
        onClick={() => deleteWorkout(data._id)}>
        {smallLoader && smallLoaderId === (data._id + 'delete')
          ? <AppLoader height={'20'} width={'20'}/>
          : <Delete className={styles.delete} />}
      </div>
      </div>
    </li>
  );
};

export default ListItem;