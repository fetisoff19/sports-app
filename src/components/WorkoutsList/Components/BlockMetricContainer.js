import React from 'react';
import {
  convertDistance,
  convertPace,
  convertSpeed,
  getHourMinSec
} from "../../../API/functionsDate&Values";
import {dict, userLang} from "../../../config/config";
import styles from '../styles.modules.scss'
const config = {
  totalDistance: {
    formatter: value => convertDistance(value).toString().replace('.', ','),
    unit: 'km',
    label: 'totalDistance',
  },
  totalTimerTime: {
    formatter: getHourMinSec,
    label: 'time',
  },
  enhancedAvgSpeed: {
    formatter: convertSpeed,
    uniqueFormatter: convertPace,
    unit: 'kmph',
    uniqueUnit: 'pace',
    uniqueSport: 'running',
    label: 'avgSpeed',
    uniqueLabel: 'avgPace',
  },
  totalAscent: {
    formatter: Math.round,
    unit: 'm',
    label: 'totalAscent',
    },
  avgHeartRate: {
    formatter: Math.round,
    unit: 'bpm',
    label: 'avgHeartRate',
  },
  avgPower: {
    formatter: Math.round,
    unit: 'power',
    label: 'avgPower',
  },
}

const baseOrder = ['totalDistance', 'totalTimerTime',  'enhancedAvgSpeed', 'totalAscent', 'avgHeartRate']
const cyclingOrder = ['totalDistance', 'totalTimerTime',  'enhancedAvgSpeed', 'totalAscent', 'avgPower']


const BlockMetricContainer = ({data}) => {
  const block = baseOrder.map((item, index) => {
    return (
      <div key={index} className={styles.mBlock} >
        <span className={styles.unit}>
          {config[item].uniqueSport === data.sport ?
            data[item]
              ? config[item].uniqueFormatter(data[item]) + ' '
              + (config[item].unit ? dict.units[config[item].uniqueUnit][userLang] : '')
              : '--'
            :
            data[item]
            ? config[item].formatter(data[item]) + ' '
            + (config[item].unit ? dict.units[config[item].unit][userLang] : '')
            : '--'}
        </span>
        <span className={styles.label}>
          {config[item].uniqueSport === data.sport ? dict.fields[config[item].uniqueLabel][userLang] : dict.fields[config[item].label][userLang]}
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