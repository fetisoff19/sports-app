import React from 'react';
import {dict, userLang} from "../../../../config/config";
import {indexes} from "./config";

const WorkoutStats = ({data, styles}) => {

let order =
  data.sport === 'running' ?
  ['heartRate', 'cadenceRun', 'pace', 'altitude', 'temperature', 'time', 'other'] :
  data.sport === 'cycling' ?
  ['heartRate', 'cadence', 'power', 'speed', 'altitude', 'temperature', 'time', 'other'] :
  ['heartRate', 'speed', 'altitude', 'temperature', 'time', 'other'];

  let stats = [];
  for (let key of order) {
    let fields = indexes[key].fields.map(item =>
      data[item] ?
      (<div className={styles.statsBlock} key={item}>
        <div className={styles.statsUnit}>
          {(indexes[key].formatter ? indexes[key].formatter(data[item]) : data[item])
          + ' ' +
          (indexes[key].unit ? dict.units[indexes[key].unit][userLang] : '')}
        </div>
        <div className={styles.statsLabel}>{dict.fields[item][userLang]}</div>
      </div>) : null
    )

    let block =
      fields.reduce((a, b) => b ? 1 : 0)
        ? (<div key={key} className={'block'}>
        <div>{dict.fields[key][userLang]}</div>
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