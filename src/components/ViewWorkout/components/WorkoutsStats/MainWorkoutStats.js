import React from 'react';
import {configMainStats, dict, userLang} from "../../../../config/config";

const MainWorkoutStats = ({data, styles}) => {
  let order = ['totalDistance', 'totalTimerTime', 'enhancedAvgSpeed', 'totalAscent', 'avgHeartRate', 'avgPower',]

  const block = order.map((item, index) => data[item]
    ? (<div key={index}>
        <span className={styles.mainStatsUnit}>
          {configMainStats[item]?.uniqueSport === data.sport
            ? (configMainStats[item].uniqueFormatter(data[item]) + ' '
              + (configMainStats[item].uniqueUnit ? dict.units[configMainStats[item].uniqueUnit][userLang] : ''))
              : (configMainStats[item].formatter(data[item]) + ' '
              + (configMainStats[item].unit ? dict.units[configMainStats[item].unit][userLang] : '')
            )
          }
        </span>
        <span className={styles.mainStatsLabel}>
          {configMainStats[item]?.uniqueSport === data.sport
            ? dict.fields[configMainStats[item].uniqueLabel][userLang]
            : dict.fields[configMainStats[item].label][userLang]}
        </span>
      </div>)
    : null
  )

  return (
    <div className={styles.mainStats}>
      {block}
    </div>
  );
};

export default React.memo(MainWorkoutStats);