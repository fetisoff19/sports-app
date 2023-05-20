import React, {useContext} from 'react';
import {dict, userLang} from "../../../config/config";
import {deleteWorkout} from "../../../API/db";
import AppContext from "../../../context/AppContext";
import BlockMetricContainer from "./BlockMetricContainer";
import ChangeName from "../../UI/ChangeName";
import styles from '../styles.modules'
import Delete from "../../UI/svgComponents/Delete";
import Cycling from "../../UI/svgComponents/Cycling";
import Running from "../../UI/svgComponents/Running";
import Walking from "../../UI/svgComponents/Walking";
import Fitness from "../../UI/svgComponents/Fitness";
import Other from "../../UI/svgComponents/Other";
import Hiking from "../../UI/svgComponents/Hiking";
import SportIcon from "./SportIcon";


const ListItem = ({data}) => {
  const {setRandom} = useContext(AppContext)

  return (
    <li className={styles.listItem}>
      <div className={styles.xsBlock + ' ' +  styles.unit}  key={data.id}>
        <span className={styles.unit}>{data.id}</span>
        <span className={styles.label}>id</span>
      </div>
      <SportIcon sport={data.sport} fill={'green'}/>
      <div className={styles.sBlock}  key={data.id + 'timestamp'} >
        <span className={styles.unit}>
          {data.timestamp.getDate() + ' ' + dict.month[data.timestamp.getMonth()][userLang]}
        </span>
        <span className={styles.label}>
          {data.timestamp.getFullYear()}
        </span>
      </div>
      <div className={styles.lBlock} key={data.name}>
        <ChangeName data={data} isLink={true} styles={styles} />
        <div className={styles.label}>{dict.sports[data.sport][userLang]}</div>
      </div>
      <BlockMetricContainer data={data}/>
      <div key={Math.random()} >
      <div className={styles.xsBlock}
        onClick={(e) => {
            deleteWorkout(+data.id, setRandom)
          }}><Delete className={styles.delete} height={'16px'} width={'16px'}/></div>
      </div>
    </li>
  );
};

export default ListItem;