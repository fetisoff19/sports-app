import React, {useContext} from 'react';
import {dict, userLang} from "../../../config/config";
import {deleteWorkout} from "../../../API/db";
import AppContext from "../../../context/AppContext";
import BlockMetricContainer from "./BlockMetricContainer";
import ChangeName from "../../UI/ChangeName";

const ListItem = ({data}) => {
  const {setRandom} = useContext(AppContext)
  const width = 150;
  return (
    <li style={{display: 'flex', textAlign: "right", }}>
      <div key={data.id} style={{width}}>{data.id}</div>
      <div key={data.sport} style={{width}}>{dict.sports[data.sport][userLang]}</div>
      <div key={data.id + 'timestamp'} style={{width}}>
        <div>
          {data.timestamp.getDate() + ' ' + dict.month[data.timestamp.getMonth()][userLang]}
        </div>
        <div>
          {data.timestamp.getFullYear()}
        </div>
      </div>
      <ChangeName data={data} isLink={true} style={{width}}/>
      <BlockMetricContainer data={data}/>
      <div key={Math.random()} style={{width}}>
      <span style={{cursor: 'pointer'}}
          onClick={(e) => {
            deleteWorkout(+data.id, setRandom)
          }}>{dict.ui.delete[userLang]}</span>
      </div>
    </li>
  );
};

export default ListItem;