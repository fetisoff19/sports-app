import React from 'react';

import {configMainStats, dict, userLang} from "../../../config/config";
import styles from '../styles.modules.scss'

const baseOrder = ['totalDistance', 'totalTimerTime',  'enhancedAvgSpeed', 'totalAscent', 'avgHeartRate']
const cyclingOrder = ['totalDistance', 'totalTimerTime',  'enhancedAvgSpeed', 'totalAscent', 'avgPower']


const BlockMetricContainer = ({data}) => {
  const block = baseOrder.map((item, index) => {
    // console.log(data)
    return (
      <div key={index} className={styles.mBlock} >
        <span className={styles.unit}>
          {configMainStats[item]?.uniqueSport?.includes(data.sport) ?
            data[item]
              ? configMainStats[item].uniqueFormatter(data[item]) + ' '
              + (configMainStats[item].unit ? dict.units[configMainStats[item].uniqueUnit][userLang] : '')
              : '--'
            :
            data[item]
            ? configMainStats[item].formatter(data[item]) + ' '
            + (configMainStats[item].unit ? dict.units[configMainStats[item].unit][userLang] : '')
            : '--'}
        </span>
        <span className={styles.label}>
          {configMainStats[item]?.uniqueSport?.includes(data.sport) ? dict.fields[configMainStats[item].uniqueLabel][userLang] : dict.fields[configMainStats[item].label][userLang]}
        </span>
      </div>
    );
  })

  return (
    <div className={styles.blockMetricContainer}>
      {block}
    </div>
  );
};

export default BlockMetricContainer;