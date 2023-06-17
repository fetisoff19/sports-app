import React from 'react';
import {dict, userLang, statsFields} from "../../../../config/config";

const WorkoutStats = ({data, styles}) => {

let order =
  data.sport === 'running' || data.sport === 'hiking'
  || data.sport === 'training' || data.sport === 'walking'
    ?  ['heartRate', 'cadenceRun', 'pace', 'altitude', 'temperature', 'time', 'other']
    : data.sport === 'cycling'
      ? ['heartRate', 'cadence', 'power', 'speed', 'altitude', 'temperature', 'time', 'other']
      : ['heartRate', 'speed', 'altitude', 'temperature', 'time', 'other'];

  let stats = [];
  for (let unit of order) {
    let fields = statsFields[unit].fields.map(item =>
      data[item] &&
      (<div className={styles.statsBlock} key={item}>
        <div className={styles.statsUnit}>
          {(statsFields[unit].formatter ? statsFields[unit].formatter(data[item]) : data[item])
          + ' ' +
          (statsFields[unit].unit ? dict.units[statsFields[unit].unit][userLang] : '')}
        </div>
        <div className={styles.statsLabel}>{dict.fields[item][userLang]}</div>
      </div>)
    )
    let block = fields.filter(a => a !== null).length
      ? (<div key={unit}>
        <div className={styles.statsMainLabel}>
          {dict.fields[unit][userLang]}
        </div>
        {fields}
          </div>)
      : null;
    stats.push(block)
  }

  return (
    <div className={styles.stats}>
      {stats}
    </div>
  );
};

export default React.memo(WorkoutStats);