import React from 'react';
import {configMainStats, dict, userLang} from "../../../../config/config";

const MainWorkoutStats = ({data, styles}) => {
  const order = ['totalDistance', 'totalTimerTime', 'enhancedAvgSpeed', 'totalAscent', 'avgHeartRate', 'avgPower',]

  const block = order.map((item, index) => {
      if(data[item]) {
        let value = data.k > 1 && configMainStats[item]?.uniqueFormatter
        ? configMainStats[item]?.uniqueFormatter(data[item])
          : configMainStats[item]?.formatter
            ? configMainStats[item]?.formatter(data[item])
              : data[item];
        let unit = data.k > 1 && configMainStats[item]?.uniqueUnit
          ? dict.units[configMainStats[item].uniqueUnit][userLang]
            : configMainStats[item].unit
              ? dict.units[configMainStats[item].unit][userLang]
                : ''
        return (<div key={index}>
        <span className={styles.mainStatsUnit}>
          {value + ' ' + unit}
        </span>
            <span className={styles.mainStatsLabel}>
          {data.k > 1 && configMainStats[item].uniqueLabel
            ? dict.fields[configMainStats[item].uniqueLabel][userLang]
            : dict.fields[configMainStats[item].label][userLang]}
        </span>
          </div>)
      }else return  null
    }
  )

  return (
    <div className={styles.mainStats}>
      {block}
    </div>
  );
};

export default React.memo(MainWorkoutStats);