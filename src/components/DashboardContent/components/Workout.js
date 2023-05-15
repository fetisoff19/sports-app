import React, {useContext, useState} from 'react';
import WorkoutName from "../../UI/WorkoutName";
import SportAndDate from "../../UI/SportAndDate";
import {convertDistance, getHourMinSec} from "../../../API/functionsDate&Values";
import {dict, userLang} from "../../../config/config";
import Maps from "../../Maps/Maps";

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
        (<div key={item}>
          <div>
            {indexes[item].formatter(data[item]) + ' '
              + (indexes[item].unit ? dict.units[indexes[item].unit][userLang] : '')}
          </div>
          <div>
            {dict.fields[item][userLang]}
          </div>
        </div>)
        : null
      )
    });

  return (
    <div>
      <div style={{display:"flex"}}>
        <SportAndDate data={data}/>
        <WorkoutName data={data}/>
        {data.note ? <div>{data.note}</div> : 'О тренировке...'}
        <div style={{display: "flex"}}>{block}</div>
        Статистика: персональные рекорды...
      </div>

      {data.polylinePoints
        ? <Maps
          polylinePoints={data.polylinePoints}
          startZoom={13}
          maxZoom={19}
          style={{height: 250, width: 200}}
          polylineStyle={{color: 'red'}}
          scrollWheelZoom={false}
        />
        : null}
    </div>
  );
};

export default Workout;

