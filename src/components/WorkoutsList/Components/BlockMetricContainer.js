import React from 'react';
import {
  convertDistance,
  convertPace,
  convertSpeed,
  getHourMinSec
} from "../../../API/functionsDate&Values";
import {dict, userLang} from "../../../config/config";

const config = {
  totalDistance: {
    formatter: value => convertDistance(value).toString().replace('.', ','),
    unit: 'km',
  },
  totalTimerTime: {
    formatter: getHourMinSec,
  },
  enhancedAvgSpeed: {
    formatter: convertSpeed,
    uniqueFormatter: convertPace,
    unit: 'kmph',
    uniqueUnit: 'pace',
    uniqueSport: 'running',
  },
  totalAscent: {
    formatter: Math.round,
    unit: 'm',
    },
  avgHeartRate: {
    formatter: Math.round,
    unit: 'bpm',
  },
  avgPower: {
    formatter: Math.round,
    unit: 'power',
  },
}

const baseOrder = ['totalDistance', 'totalTimerTime',  'enhancedAvgSpeed', 'totalAscent', 'avgHeartRate']
const cyclingOrder = ['totalDistance', 'totalTimerTime',  'enhancedAvgSpeed', 'totalAscent', 'avgPower']


const BlockMetricContainer = ({data}) => {
  const block = baseOrder.map((item, index) => {
    return (
      <div key={index} style={{width: 150, textAlign: 'right'}}>
        <div>
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
        </div>
        <div>
          {dict.fields[item][userLang]}
        </div>
      </div>
    );
  })

  return (
    <div style={{display: "flex", paddingRight: 20}}>
      {block}
    </div>
  );
};

export default BlockMetricContainer;