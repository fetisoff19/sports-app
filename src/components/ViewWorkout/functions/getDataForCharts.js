import {convertPaceInMinute, convertSpeed} from "../../../API/functionsDate&Values";
import {garminLatLongToNormal} from "../../../API/utils";

export function getDataForCharts(workoutData, smoothing, powerCurve) {
  console.time(2)
  if (!workoutData) return;
  let recordMesgs = workoutData.recordMesgs;
  if ((isNaN(recordMesgs.at(-1).heartRate)
    && isNaN(recordMesgs.at(-1).enhancedSpeed)
    && isNaN(recordMesgs.at(-1).distance)
    && isNaN(recordMesgs.at(-1).power)
    && isNaN(recordMesgs.at(-1).enhancedAltitude))
    || !recordMesgs.at(-1).distance) return;

  let result = {};
  let polylinePoints = [];
  let powerCurveArray = [];
  let timeBetweenRecords = Math.round((workoutData.sessionMesgs[0].totalTimerTime / recordMesgs.length))
  smoothing = Math.ceil(smoothing / timeBetweenRecords);

  let step = 0;
  let avgTimeSmoothing = 0;
  let stepTimeArray = [];

  let speedAvg = 0;
  if (workoutData.sessionMesgs[0].avgSpeed) {
    speedAvg = convertSpeed(workoutData.sessionMesgs[0].avgSpeed);
  }
  let speedDistanceArray = [];
  let speedMin = 200;
  let speedMax = 0;
  let avgSpeedSmoothing = 0;

  let powerAvg = 0;
  if (workoutData.sessionMesgs[0].avgPower) {
    powerAvg = Math.round(workoutData.sessionMesgs[0].avgPower);
  }
  let powerDistanceArray = [];
  let powerMin = 2000;
  let powerMax = 0;
  let avgPowerSmoothing = 0;

  let heartRateAvg = 0;
  if (workoutData.sessionMesgs[0].avgHeartRate) {
    heartRateAvg = Math.round(workoutData.sessionMesgs[0].avgHeartRate);
  }
  let heartRateDistanceArray = [];
  let heartRateMin = 250;
  let heartRateMax = 0;
  let avgHeartRateSmoothing = 0;

  // каденс если шагаешь х2, если крутишь 1 к 1
  let k = (workoutData.sessionMesgs[0].sport === 'running'
    || workoutData.sessionMesgs[0].sport === 'training'
    || workoutData.sessionMesgs[0].sport === 'walking'
    || workoutData.sessionMesgs[0].sport === 'hiking')
    ? 2 : 1;
  let cadenceAvg = 0;
  if (workoutData.sessionMesgs[0].avgCadence) {
    cadenceAvg = Math.round(workoutData.sessionMesgs[0].avgCadence) * k;
  }
  let cadenceDistanceArray = [];
  let cadenceMin = 500;
  let cadenceMax = 0;
  let avgCadenceSmoothing = 0;

  let altitudeAvg = 0;
  let altitudeDistanceArray = [];
  let altitudeMin = 8000;
  let altitudeMax = 0;
  let avgAltitudeSmoothing = 0;

  let paceAvg = 0;
  if (workoutData.sessionMesgs[0].enhancedAvgSpeed) {
    paceAvg = convertPaceInMinute(workoutData.sessionMesgs[0].enhancedAvgSpeed);
  }
  let paceDistanceArray = [];
  let avgPaceSmoothing = 0;

  for (let i = 0; i < recordMesgs.length; i++) {
    if (isNaN(recordMesgs[i].distance)) continue;
    step++;

    let distance = +(recordMesgs[i].distance / 1000).toFixed(2); // км
    let speed = +(recordMesgs[i].speed * 3.6).toFixed(1); // км/ч
    let pace = 0;
    let power = recordMesgs[i].power; // Вт
    let heartRate = recordMesgs[i].heartRate;
    let cadence = recordMesgs[i].cadence * k;
    let altitude = Math.round(recordMesgs[i].enhancedAltitude); // м

    if (isNaN(speed)) speed = 0;
    if (isNaN(power)) power = 0;
    if (isNaN(heartRate)) heartRate = 0;
    if (isNaN(cadence)) cadence = 0;

    avgSpeedSmoothing += speed;
    speedMin = Math.min(speedMin, speed);
    speedMax = Math.max(speedMax, speed);

    avgPowerSmoothing += power;
    powerMin = Math.min(powerMin, power);
    powerMax = Math.max(powerMax, power);

    avgHeartRateSmoothing += heartRate;
    heartRateMin = Math.min(heartRateMin, heartRate);
    heartRateMax = Math.max(heartRateMax, heartRate);

    if (k === 2 && cadence === 0) cadence = cadenceAvg // при беге каденс не может быть равен 0
    avgCadenceSmoothing += cadence;
    cadenceMin = Math.min(cadenceMin, cadence);
    cadenceMax = Math.max(cadenceMax, cadence);

    if (isNaN(altitude) || altitude > 6000 || altitude < -300) altitude = altitudeAvg / step; // отсеиваем брак в данных
    avgAltitudeSmoothing += altitude;
    altitudeMin = Math.min(altitudeMin, altitude);
    altitudeMax = Math.max(altitudeMax, altitude);
    altitudeAvg += altitude;

    if (recordMesgs[i].enhancedSpeed) {
      pace = convertPaceInMinute(recordMesgs[i].enhancedSpeed)
    } // получаем мин/км
    if (isNaN(pace) || pace > (workoutData.sessionMesgs[0].sport === 'running' ? 15 : 60) || pace < 1.5) pace = paceAvg; // отсеиваем брак в данных
    avgPaceSmoothing += pace;

    if (i > 0) {
      let stepTime = (recordMesgs[i].timestamp - recordMesgs[i - 1].timestamp) / 1000;  // получаем время в секундах между соседними элементами массива
      avgTimeSmoothing += stepTime;
    }

    if (i === smoothing) {
      speedDistanceArray.push([0, +(avgSpeedSmoothing / smoothing).toFixed(1)]);
      powerDistanceArray.push([0, Math.round(avgPowerSmoothing / smoothing)]);
      heartRateDistanceArray.push([0, Math.round(avgHeartRateSmoothing / smoothing)])
      cadenceDistanceArray.push([0, Math.round(avgCadenceSmoothing / smoothing)])
      altitudeDistanceArray.push([0, Math.round(avgAltitudeSmoothing / smoothing)]);
      paceDistanceArray.push([0, +(avgPaceSmoothing / smoothing).toFixed(2)]);
      stepTimeArray.push([0, 0]);
    }

    if (!(i % smoothing) && i > 0) {
      speedDistanceArray.push([distance, +(avgSpeedSmoothing / smoothing).toFixed(1)]);
      powerDistanceArray.push([distance, Math.round(avgPowerSmoothing / smoothing)]);
      heartRateDistanceArray.push([distance, Math.round(avgHeartRateSmoothing / smoothing)])
      cadenceDistanceArray.push([distance, Math.round(avgCadenceSmoothing / smoothing)])
      altitudeDistanceArray.push([distance, Math.round(avgAltitudeSmoothing / smoothing)]);
      paceDistanceArray.push([distance, +(avgPaceSmoothing / smoothing).toFixed(2)]);
      stepTimeArray.push([Math.round(avgTimeSmoothing), 0]);

      // сбрасываем средние значения:
      avgSpeedSmoothing = 0;
      avgPowerSmoothing = 0;
      avgHeartRateSmoothing = 0;
      avgCadenceSmoothing = 0;
      avgAltitudeSmoothing = 0;
      avgPaceSmoothing = 0;

    }
    if (recordMesgs[i].hasOwnProperty('positionLat')){
      polylinePoints.push(
        garminLatLongToNormal(
          [recordMesgs[i].positionLat, recordMesgs[i].positionLong]) );
    }
  }

  if (step < 1) {
    console.log(step)
    return
  };
  if (powerCurve) {
    powerCurve.forEach((value, key) =>
      powerCurveArray.push([+key, value.value])
    )
  };

  result = {
    charts: {
      speed: k === 1 ? {
        data: speedDistanceArray,
        avg: speedAvg,
        min: speedMin,
        max: speedMax,
      } : {},
      pace: k === 2 ?{
        data: paceDistanceArray,
        avg: paceAvg,
      } : {},
      power: {
        data: powerDistanceArray,
        avg: powerAvg,
        min: powerMin,
        max: powerMax,
      },
      heartRate:{
        data: heartRateDistanceArray,
        avg: heartRateAvg,
        min: heartRateMin,
        max: heartRateMax,
      },
      cadence: {
        data: cadenceDistanceArray,
        avg: cadenceAvg,
        min: cadenceMin,
        max: cadenceMax,
      },
      altitude:{
        data: altitudeDistanceArray,
        avg: Math.round(altitudeAvg / step),
        min: altitudeMin,
        max: altitudeMax,
      },
      powerCurve: powerCurveArray.length && {
        data: powerCurveArray,
      },
      powerCurveAllTime: workoutData?.workout?.powerCurveAllTime && {
        data: workoutData?.workout?.powerCurveAllTime,
      } || null,
    },
    step: stepTimeArray,
    smoothing: smoothing,
    polylinePoints: polylinePoints,
    powerCurve: powerCurve || null,
    powerCurveAllTimeMap: workoutData?.workout?.powerCurveAllTimeMap || null,
    sport: workoutData.sessionMesgs[0].sport || null,
  }
  console.timeEnd(2)
  return result
}
