import {convertPace, convertSpeed, doubleValue, getHourMinSec} from "../../../../API/functionsDate&Values";

export let indexes = {
  heartRate: {
    fields: [
      'maxHeartRate',
      'avgHeartRate',
    ],
    formatter: Math.round,
    unit: 'bpm',
  },
  speed: {
    fields: [
      'maxSpeed',
      'avgSpeed',
    ],
    formatter: convertSpeed,
    unit: 'kmph',
  },
  pace: {
    fields: [
      'enhancedMaxSpeed',
      'enhancedAvgSpeed',
    ],
    formatter: convertPace,
    unit: 'pace',
  },
  power: {
    fields: [
      'maxPower',
      'normalizedPower',
      'avgPower',
    ],
    formatter: Math.round,
    unit: 'w',
  },
  time: {
    fields: [
      'totalTimerTime',
      'totalElapsedTime',
      'timestamp',
      'startTime',
    ],
    formatter: getHourMinSec,
    unit: null,
  },
  cadenceRun: {
    fields: [
      'maxCadence',
      'avgCadence',
    ],
    formatter: doubleValue,
    unit: 'cadenceRun',
  },
  cadence: {
    fields: [
      'maxCadence',
      'avgCadence',
    ],
    formatter: Math.round,
    unit: 'cadenceCycling',
  },
  altitude: {
    fields: [
      'totalAscent',
      'totalDescent',
      'maxAltitude',
      'minAltitude',
    ],
    formatter: Math.round,
    unit: 'm',
  },
  temperature: {
    fields: [
      'maxTemperature',
      'avgTemperature',
    ],
    formatter: Math.round,
    unit: 'degreeCelsius',
  },
  other: {
    fields: [
      'totalStrides',
      'trainingStressScore',
      'totalCalories',
    ],
    formatter: null,
    unit: null,
  }
}