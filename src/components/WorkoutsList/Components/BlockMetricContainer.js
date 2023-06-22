import React from 'react';

import {configMainStats, dict, userLang} from "../../../config/config";
import styles from '../styles.modules.scss'

const baseOrder = ['totalDistance', 'totalTimerTime',  'enhancedAvgSpeed', 'totalAscent', 'avgHeartRate']
const cyclingOrder = ['totalDistance', 'totalTimerTime', 'enhancedAvgSpeed', 'totalAscent', 'avgPower']


const BlockMetricContainer = ({data}) => {

  const block = baseOrder.map((item, index) => {
    let value = data.k > 1 && configMainStats[item]?.uniqueFormatter && data[item]
      ? configMainStats[item]?.uniqueFormatter(data[item])
        : configMainStats[item]?.formatter && data[item]
          ? configMainStats[item]?.formatter(data[item])
            : data[item];


    return (
      <div key={index} className={styles.mBlock} >
        <span className={styles.unit}>
          {value && data.k > 1 && configMainStats[item]?.uniqueUnit
            ? (value + ' '
              + (configMainStats[item]?.uniqueUnit
                ? dict.units[configMainStats[item]?.uniqueUnit][userLang]
                : ''))
            : value
              ? (value + ' '
                + (configMainStats[item]?.unit
                  ? dict.units[configMainStats[item].unit][userLang]
                  : ''))
            : '--'}
        </span>
        <span className={styles.label}>
          {data.k > 1 && configMainStats[item]?.uniqueLabel
            ? dict.fields[configMainStats[item].uniqueLabel][userLang]
            : dict.fields[configMainStats[item].label][userLang]}
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