const fs = require('fs');
const config = require('config')
const Polyline = require("../models/Polyline");
const PowerCurve = require("../models/PowerCurve");
const ChartsData = require("../models/ChartsData");
const FitParser = require('fit-file-parser').default;

class WorkoutService {

  async getWorkoutFields(path, file, userId) {
    return new Promise(async (resolve, reject) => {
      try {
        await fs.readFile(path, async function (err, content) {
          let fitParser = new FitParser();
          fitParser.parse(content, async function (error, data) {
            if (error) {
              console.log('FitParser error', error);
              return reject({message: 'FitParser error'})
            } else {
              if (data?.sessions[0]) {
                let sessions = data.sessions[0];
                file.sport = sessions?.sport || 'other';

                file.k = (file.sport === 'running'
                  || file.sport === 'training'
                  || file.sport === 'walking'
                  || file.sport === 'hiking')
                  ? 2 : 1;

                file.subSport = sessions?.sub_sport || null;

                file.totalTimerTime = sessions?.total_timer_time || null;
                file.totalElapsedTime = sessions?.total_elapsed_time || null;
                file.startTime = new Date(sessions?.start_time) || null;
                file.timestamp = new Date(sessions?.timestamp) || null;

                file.totalDistance = sessions?.total_distance || null;

                file.avgSpeed = sessions?.avg_speed || null;
                file.enhancedAvgSpeed = sessions?.enhanced_avg_speed || sessions?.avg_speed || null;

                file.maxSpeed = sessions?.max_speed || null ;
                file.enhancedMaxSpeed = sessions?.enhanced_max_speed || sessions?.max_speed  || null ;

                file.avgHeartRate = Math.round(sessions?.avg_heart_rate) || null;
                file.maxHeartRate = Math.round(sessions?.max_heart_rate) || null;

                file.avgCadence = Math.round(sessions?.avg_cadence * file.k) || null;
                file.maxCadence = Math.round(sessions?.max_cadence * file.k) || null;

                file.avgPower = Math.round(sessions?.avg_power) || null;
                file.maxPower = Math.round(sessions?.max_power) || null;
                file.normalizedPower = Math.round(sessions?.normalized_power) || null;

                file.totalAscent = Math.round(sessions?.total_ascent) || null;
                file.totalDescent = Math.round(sessions?.total_descent) || null;
                file.maxAltitude = Math.round(sessions?.max_altitude) || null;
                file.avgAltitude = Math.round(sessions?.avg_altitude) || null;
                file.minAltitude = Math.round(sessions?.min_altitude)  || null;

                file.maxTemperature = Math.round(sessions?.max_temperature) || null;
                file.avgTemperature = Math.round(sessions?.avg_temperature) || null;

                file.totalStrides = Math.round(sessions?.total_cycles) || null;
                file.trainingStressScore = Math.round(sessions?.training_stress_score) || null;
                file.totalCalories = Math.round(sessions?.total_calories) || null;
                file.timeStep = +((sessions?.total_timer_time || data.records.length)
                  / data.records.length).toFixed(1) || 1;

/////////////////////////////////////////////////////////////////////////////////////
//                 console.log(data)
                let correctValue = 0;
                if(data.records[1].hasOwnProperty('position_lat')
                  && data.records[1].hasOwnProperty('timestamp')
                  && !data.records[1].hasOwnProperty('distance')
                  && !data.records[0].hasOwnProperty('position_lat')
                  && data.records[0].hasOwnProperty('distance')
                  && !data.records[0].hasOwnProperty('timestamp')){
                  correctValue = 1;
                }
                // console.log('correctValue: ', correctValue,
                //   data.records[0],
                //   data.records[1],
                  // data.records[1].hasOwnProperty('position_lat'),
                  // data.records[1].hasOwnProperty('timestamp'),
                  // !data.records[1].hasOwnProperty('distance'),
                  // !data.records[0].hasOwnProperty('position_lat'),
                  // data.records[0].hasOwnProperty('distance'),
                  // !data.records[0].hasOwnProperty('timestamp')

                  // )


                if (data?.records?.length > 0 && (data?.records.at(-1).distance > 0)) {
                  const chartsData = new ChartsData({
                    workout: file._id,
                    fileName: file.workoutName,
                    user: userId,
                    records: [],
                    recordsLength: data.records.length,
                  });

                  file.chartsData = chartsData._id;

                  file.smoothing = file.timeStep < 1.5
                    ? 8 : file.timeStep < 4
                      ? 4 : 2


                  let avgSpeedSmoothing = 0;
                  let avgPowerSmoothing = 0;
                  let avgHeartRateSmoothing = 0;
                  let avgCadenceSmoothing = 0;
                  let avgAltitudeSmoothing = 0;
                  let avgTimeSmoothing = 0;


                  let maxSpeed = 0;
                  let maxPower = 0;
                  let maxHeartRate = 0;
                  let maxCadence = 0;
                  let minAltitude = 10000;
                  let avgAltitude = 0;
                  let maxAltitude = -500;


                  data.records.forEach((record, index) => {
                    // if(!record.hasOwnProperty('distance') ||)
                    let distance = +(record?.distance / 1000).toFixed(2); // км
                    let speed = file.k > 1 && record?.enhanced_speed
                      ? convertPaceInMinute(record.enhanced_speed)
                      : +(record?.speed * 3.6).toFixed(1)
                    let power = record?.power; // Вт
                    let heartRate = record?.heart_rate;
                    let cadence = record?.cadence * file.k;
                    let altitude = Math.round(record?.enhanced_altitude || record?.altitude); // м

                    if(altitude) {
                      minAltitude = Math.min(minAltitude, altitude)
                      maxAltitude = Math.max(maxAltitude, altitude)
                    }

                    if (isNaN(speed)) speed = 0;
                    if (isNaN(power)) power = 0;
                    if (isNaN(heartRate)) heartRate = 0;
                    if (isNaN(cadence)) cadence = 0;
                    if (isNaN(altitude)) altitude = 0;
                    if(file.k === 2 && speed < 1.5) speed = convertPaceInMinute(file?.enhancedAvgSpeed)
                    if (index > 0) {
                      let stepTime = (record.timestamp - data.records[index - 1].timestamp) / 1000;  // получаем время в секундах между соседними элементами массива
                      avgTimeSmoothing += stepTime;
                    }
                    avgAltitude += altitude;

                    if(file.smoothing === 1) {
                      chartsData.records.push({
                        distance: distance,
                        speed: speed,
                        heartRate: heartRate,
                        power: power,
                        cadence: cadence,
                        altitude: altitude,
                        timestamp: avgTimeSmoothing,
                      })
                    }

                    else {
                      if (index === 0) {
                        chartsData.records.push({
                          distance: distance,
                          speed: speed,
                          heartRate: heartRate,
                          power: power,
                          cadence: cadence,
                          altitude: altitude,
                          timestamp: avgTimeSmoothing,
                        });
                      }

                      avgSpeedSmoothing += speed;
                      maxSpeed = Math.max(maxSpeed, speed);

                      avgPowerSmoothing += power;
                      maxPower = Math.max(maxPower, power);

                      avgHeartRateSmoothing += heartRate;
                      maxHeartRate = Math.max(maxHeartRate, heartRate);

                      avgCadenceSmoothing += cadence;
                      maxCadence = Math.max(maxCadence, cadence);

                      avgAltitudeSmoothing += altitude;


                      if (!(index % file.smoothing) && index > 0){
                        chartsData.records.push({
                          distance: distance,
                          speed: +(avgSpeedSmoothing / file.smoothing).toFixed(1),
                          heartRate: Math.round(avgHeartRateSmoothing / file.smoothing),
                          power: Math.round(avgPowerSmoothing / file.smoothing),
                          cadence: Math.round(avgCadenceSmoothing / file.smoothing),
                          altitude: Math.round(avgAltitudeSmoothing / file.smoothing),
                          timestamp: avgTimeSmoothing,
                        });

                        avgSpeedSmoothing = 0;
                        avgPowerSmoothing = 0;
                        avgHeartRateSmoothing = 0;
                        avgCadenceSmoothing = 0;
                        avgAltitudeSmoothing = 0;
                      }
                    }

                  })

                  // if(!file.maxSpeed) file.maxSpeed = maxSpeed;
                  if(!file.totalDistance && data?.records.at(-1)?.distance > 0)
                    file.totalDistance = data?.records.at(-1).distance;

                  if(!file.maxPower && maxPower) file.maxPower = maxPower;
                  if(!file.maxHeartRate && maxHeartRate) file.maxHeartRate = maxHeartRate;
                  if(!file.maxCadence && maxCadence) file.maxCadence = maxCadence * file.k;
                  if(!file.avgAltitude && avgAltitude) file.avgAltitude = Math.round(avgAltitude / data.records.length);
                  if(!file.minAltitude && minAltitude !== 10000) file.minAltitude = minAltitude;
                  if(!file.maxAltitude && maxAltitude !== -500) file.maxAltitude = maxAltitude;

                  await chartsData.save()
                }

                if (sessions?.sport === 'cycling' && file.avgPower) {
                  const powerCurve = new PowerCurve({
                    workout: file._id,
                    fileName: file.workoutName,
                    user: userId,
                    points: new Map(),
                  });
                  searchMaxValue(timePeriod, data, 'cycling', 'power', powerCurve)
                  file.powerCurve = powerCurve._id;
                  await powerCurve.save();
                }

                if (data.records.at(- 1).hasOwnProperty('position_lat') ||
                  data.records[Math.round(data.records.length / 2 )].hasOwnProperty('position_lat') ||
                  data.records[0].hasOwnProperty('position_lat')) {
                  const polyline = new Polyline({
                    workout: file._id,
                    fileName: file.workoutName,
                    user: userId,
                    points: [],
                    origLength: data.records.length,
                    arrayLength: 1,
                  });


                  // 2s : 10, 4s : 16: , 6s : 18, 10s : 20,
                  data.records.forEach((item , index) => {
                    if(item.hasOwnProperty('position_lat') && !(index % file.smoothing))
                      polyline.points.push([item.position_lat, item.position_long])
                  })
                  polyline.arrayLength = polyline.points.length
                  file.polyline = polyline._id;
                  await polyline.save();
                }
                // console.log(file)
                return resolve(file)
              }
              // await file.save();
            }
          });
        });

      } catch (e) {
        // await file.save();
        return reject({message: 'File error'})
      }
    })
  }


  async addWorkoutToWorkouts(file) {
    return new Promise(async (resolve, reject) => {
      try {

        fs.readFile(path, function (err, content) {
          let fitParser = new FitParser();
          fitParser.parse(content, function (error, data) {
            if (error) {
              console.log(error);
            } else {
              let newWorkouts = {};
              newWorkouts.name = file.name.replace('.fit','');
              let polylinePoints = copyKeyInObj(data, newWorkouts)
              addTextFile(workoutsPath, newWorkouts)
              // if(polylinePoints){
              //   const workoutsPath = `${config.get('filePath')}\\${userId}\\polylinePoints`
              //   const polylineFile = new File({name: 'workouts', path: 'workouts.txt', type: 'txt', user: user.id});
              // }

            }
          });
        });

        workouts.size = this.getSize(workoutsPath);
        await workouts.save(fs.statSync(workoutsPath).size);

        return resolve({message: 'Workouts has been added'})
      } catch (e) {
        return reject({message: 'File error'})
      }
    })
  }




  deleteFile(file) {
    const path = this.getPath(file)
    if (file.type === 'dir') {
      fs.rmdirSync(path)
    } else {
      fs.unlinkSync(path)
    }
  }

  getPath(file) {
    return config.get("filePath") + '\\' + file.user + '\\' + file.path;
  }

  getSize(path){
    return fs.statSync(path).size
  }

}


function addTextFile(path, obj) {
  let fileContent = fs.readFileSync(path, "utf8");
  let json = fileContent && fileContent.length ? JSON.parse(fileContent) : [];
  json.push(obj);
  fs.writeFileSync(path, JSON.stringify(json))
}


let filterArrForWorkouts = [
  'timestamp',
  'start_time',
  'total_elapsed_time',
  'total_timer_time',
  'total_distance',
  'total_cycles',
  'enhanced_avg_speed',
  'enhanced_max_speed',

  'total_work',
  'total_calories',
  'avg_speed',
  'max_speed',
  'avg_power',
  'max_power',
  'total_ascent',
  'total_descent',
  'training_stress_score',
  "max_altitude",
  "avg_pos_vertical_speed",
  "max_pos_vertical_speed",
  "min_altitude",
  "sport",
  "sub_sport",
  "avg_heart_rate",
  "max_heart_rate",
  "avg_cadence",
  "max_cadence",
  "avg_temperature",
  "max_temperature",
  "min_heart_rate",
  "avg_left_torque_effectiveness",
  "avg_right_torque_effectiveness",
  'avg_fractional_cadence',
  'max_fractional_cadence',
  "avg_left_pedal_smoothness",
  "avg_right_pedal_smoothness",

  // 'totalElapsedTime',
  // 'totalTimerTime',
  // 'totalDistance',
  'totalStrides',
  // 'totalCalories',
  // 'avgSpeed',
  // 'enhancedAvgSpeed',
  'avgPower',
  'maxPower',
  'maxSpeed',
  'minAltitude',
  'avgAltitude',
  'maxAltitude',
  'avgGrade',
  'maxPosGrade',
  'totalAscent',
  'totalDescent',
  'sport',
  'avgHeartRate',
  'minHeartRate',
  'maxHeartRate',
  'avgCadence',
  'maxCadence',
  'avgRunningCadence',
  'note',
  'editDate',
];

function copyKeyInObj(origObj, newObj) {
  newObj.dateAdded = new Date();
  newObj.note = '';

  if ('sessions' in origObj && origObj.sessions[0]) {
    let targetObj = origObj.sessions[0];
    for (let key in targetObj) {
      if (filterArrForWorkouts.includes(key))
        newObj[key] = targetObj[key]
    }
    filterValuesWorkout(newObj)
  }
  if (newObj.sport === 'cycling') {
    const powerCurve = searchMaxValue(timePeriod, origObj, 'cycling', 'power')
    newObj.powerCurve = powerCurve ? Object.fromEntries(powerCurve) : null;
  }

  let polylinePoints = [];
  if (origObj.records[0].hasOwnProperty('position_lat')) {
    const timeStep = origObj.records.length / (newObj?.total_timer_time || origObj.records.length);
    const smoothing = timeStep < 3 ? 10 : timeStep < 5 ? 5 : timeStep < 10 ? 3 : 2
    origObj.records.forEach((item , index) => {
      if(item.hasOwnProperty('position_lat') && !(index % smoothing))
        polylinePoints.push(
          garminLatLongToNormal(
            [item.position_lat, item.position_long]) );
    })
    newObj.polylinePoints = true;
  }
  return polylinePoints.length ? polylinePoints : null
}

function filterValuesWorkout (workout) {
  for (let key in workout) {
    if
      // (typeof workout[key] === 'object') {
      //     workout[key] = workout[key].toLocaleString("en-GB");
      // } else if
    (typeof workout[key] === 'number'
      && workout[key].toString().length > 12) {
      workout[key] = workout[key].toFixed(0);
    }
  }
}

let timePeriod = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, //+1     10s
  12, 14, 16, 18, 20, 22, 24, 26, 28, 30, //+2     30s
  33, 36, 39, 42, 45, 48 ,51, 54, 57, 60, //+3     1min
  65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, //+5     2min
  130, 140, 150, 160, 170, 180, //+10     3min
  200, 220, 240, 260, 280, 300, //+20     5min
  330, 360, 390, 420, 450, 480, 510, 540, 570, 600,  //+30  10min
  660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, //+60  20min
  1320, 1440, 1560, 1680, 1800, 1920, 2040, 2160, 2280, 2400, //+120  40min
  2580, 2760, 2940, 3120, 3300, 3480, 3660, 3840, 4020, 4200, //+180  70min
  4800, 5600, 6200, 6600, 7200, 7800, 8400, 9000, 9600, 10200, 10800, //+600  180min
  11700, 12600, 13500, 14400, 15300, 16200, 17100, 18000, //+900  300min
];

function searchMaxValue(arr, obj, sport, unit, file) {
  if (obj.sessions[0].sport === sport
    && (Number.isInteger(obj.records[0][unit]) || Number.isInteger(obj.records[1][unit]))) {
    let data = obj.records;
    let timestamp = 1;
    if (data[0].timestamp)
      timestamp = Math.round((data[1].timestamp - data[0].timestamp) / 1000);
    let timePeriod = arr;
    timePeriod.forEach(item => item * timestamp);
    // let periodBetweenStep = 1;
    let result = new Map(); // здесь будем хранить сумму наибольших значений за промежуток времени
    let partialSum = {} // здесь будем хранить сумму значений на данном этапе итерации
    let indexObj = {};
    for (let item of timePeriod) {
      if (Number.isInteger(item) && item > 0)
        if (item > data.length) continue;
      result.set(item, 0);
      partialSum[item] = 0;
      indexObj[item] = '';
    }
    for (let i = 0; i < data.length; i++) {
      if (isNaN(data[i][unit])) continue;
      // if (i > 0)
      // periodBetweenStep = Math.round((data[i].timestamp - data[i - 1].timestamp) / 1000);// обнуляем счётчик partialSum
      for (let item of timePeriod) {
        if (item <= data.length) {
          // if ((periodBetweenStep - timestamp) / item > 0.2) { // если пауза была больше 20%, то сбрасываем partialSum[item]
          //     console.log (periodBetweenStep, item, i)
          //     partialSum[item] = 0;
          // }
          let previousValue = 0;
          if (i < item) {
            partialSum[item] = partialSum[item] + data[i][unit];
            if (partialSum[item] > result.get(item)) {
              result.set(item, partialSum[item]);
              indexObj[item] = 0;
            }
          } else if (i >= item && Number.isInteger(data[i - item][unit])) {
            previousValue = data[i - item][unit];
            partialSum[item] = partialSum[item] + data[i][unit] - previousValue;
            if (partialSum[item] > result.get(item)) {
              result.set(item, partialSum[item]);
              indexObj[item] = i - item;
            }
          }
        }
      }
    }
    for (let key of result.keys()) {
      file.points.set(key.toString(), {value: Math.round(result.get(+key) / +key), index: +indexObj[+key]});
    }
    return file;
  }
  else return null
}


async function fields(path){
  let result = {}
   fs.readFile(path, function (err, content) {
    let fitParser = new FitParser();
    fitParser.parse(content, function (error, data) {
      if (error) {
        console.log(error);
      } else if(data?.sessions[0]) {
          const sessions = data.sessions[0];

          result.sport = sessions?.sport || null;
          result.startTime = sessions?.start_time || null;
          result.totalDistance = sessions?.total_distance || null;
          result.totalTimerTime = sessions?.total_timer_time || null;
          result.avg_speed = sessions?.avg_speed || null;
          result.enhancedAvgSpeed = sessions?.enhanced_avg_speed || null;
          result.totalAscent = sessions?.total_ascent || null;
          result.avgHeartRate = sessions?.avg_heart_rate || null;
          result.maxHeartRate = sessions?.max_heart_rate || null;
          result.avgPower = sessions?.avg_power || null;
          result.totalCalories = sessions?.total_calories || null;

          return result
          // return {
          //   sport: sessions?.sport || null,
          //   startTime: sessions?.start_time || null,
          //   totalDistance: sessions?.total_distance || null,
          //   totalTimerTime: sessions?.total_timer_time || null,
          //   enhancedAvgSpeed: sessions?.enhanced_avg_speed || null,
          //   totalAscent: sessions?.total_acscent || null,
          //   avgHeartRate: sessions?.avg_heart_rate || null,
          //   maxHeartRate: sessions?.max_heart_rate || null,
          //   avgPower: sessions?.avg_power || null,
          //   totalCalories: sessions?.total_calories || null,
          // }

          // console.log(1, result)

        // let newWorkouts = {};
        // newWorkouts.name = file.name.replace('.fit','');
        // let polylinePoints = copyKeyInObj(data, newWorkouts)
        // addTextFile(workoutsPath, newWorkouts)
        // if(polylinePoints){
        //   const workoutsPath = `${config.get('filePath')}\\${userId}\\polylinePoints`
        //   const polylineFile = new File({name: 'workouts', path: 'workouts.txt', type: 'txt', user: user.id});
        // }
      }
    });
  });
}


let convertPaceInMinute = value => +(60/(3.6 * value)).toFixed(2);
 let convertSpeed = value =>  +(value * 3.6).toFixed(1);



module.exports = new WorkoutService();