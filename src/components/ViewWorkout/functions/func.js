import {convertPaceInMinute, convertSpeed} from "../../../API/functionsDate&Values";

export function getDataA(data, workout){
  // console.time(1)
  let result = {};
  let speedDistanceArray = [];
  let powerDistanceArray = [];
  let heartRateDistanceArray = [];
  let cadenceDistanceArray = [];
  let altitudeDistanceArray = [];
  let timeArray = [];

  data.forEach(item => {
    speedDistanceArray.push([item.distance, item.speed]);
    powerDistanceArray.push([item.distance, item.power]);
    heartRateDistanceArray.push([item.distance, item.heartRate]);
    cadenceDistanceArray.push([item.distance, item.cadence]);
    altitudeDistanceArray.push([item.distance, item.altitude]);
    timeArray.push(item.timestamp)
  })


  result = {
    charts: {
      speed: workout.k === 1 ? {
        data: speedDistanceArray,
        avg: convertSpeed(workout?.avgSpeed),
        min: 0,
        max: convertSpeed(workout?.maxSpeed),
      } : null,
      pace: workout.k === 2 ? {
        data: speedDistanceArray,
        avg: convertPaceInMinute(workout?.enhancedAvgSpeed),
        // max: convertPaceInMinute(workout?.enhancedMaxSpeed),
      } : null,
      power: {
        data: powerDistanceArray,
        avg: workout?.avgPower,
        min: 0,
        max: workout?.maxPower,
      },
      heartRate:{
        data: heartRateDistanceArray,
        avg: workout?.avgHeartRate,
        min: workout?.minHeartRate,
        max: workout?.maxHeartRate,
      },
      cadence: {
        data: cadenceDistanceArray,
        avg: workout?.avgCadence,
        min: 0,
        max: workout?.maxCadence,
      },
      altitude:{
        data: altitudeDistanceArray,
        avg: workout?.avgAltitude,
        min: workout?.minAltitude,
        max: workout?.maxAltitude,
      },
      // powerCurve: powerCurveArray.length && {
      //   data: powerCurveArray,
      // },
      // powerCurveAllTime: workoutData?.workout?.powerCurveAllTime && {
      //   data: workoutData?.workout?.powerCurveAllTime,
      // } || null,
    },
    step: Math.round(workout?.timeStep),
    timeArray: timeArray,
    smoothing: workout.smoothing,
    // powerCurveAllTimeMap: workoutData?.workout?.powerCurveAllTimeMap || null,
    sport: workout.sport,
  }
  // console.timeEnd(1)
  return result
}