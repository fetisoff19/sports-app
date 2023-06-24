const {Schema, model, ObjectId} = require("mongoose")


const File = new Schema({
  name: {type: String, required: true},
  workoutName: {type: String, required: true},
  user: {type: ObjectId, ref:'User', index: true},

  polyline: {type: ObjectId, ref:'Polyline', index: true},
  powerCurve: {type: ObjectId, ref:'PowerCurve', index: true},
  chartsData: {type: ObjectId, ref:'ChartData', index: true},
  smoothing: {type: Number, default: 1},

  type: {type: String, required: true},
  accessLink: {type: String},
  size: {type: Number, default: 0},
  date: {type: Date, default: Date.now()},
  path: {type: String, default: ''},


  sport: {type: String, index: true},
  subSport: {type: String},
  k: {type: Number},
  timeStep: {type: Number},

  totalDistance: {type: Number, default: 0},

  totalTimerTime: {type: Number},
  totalElapsedTime: {type: Number},
  timestamp: {type: Number},
  startTime: {type: Number},

  maxSpeed: {type: Number},
  enhancedMaxSpeed: {type: Number},
  avgSpeed: {type: Number},
  enhancedAvgSpeed: {type: Number},

  avgHeartRate: {type: Number},
  maxHeartRate: {type: Number},

  maxCadence: {type: Number},
  avgCadence: {type: Number},

  avgPower: {type: Number},
  maxPower: {type: Number},
  normalizedPower: {type: Number},

  totalAscent: {type: Number},
  totalDescent: {type: Number},
  maxAltitude: {type: Number},
  avgAltitude: {type: Number},
  minAltitude: {type: Number},

  maxTemperature: {type: Number},
  avgTemperature: {type: Number},

  totalStrides: {type: Number},
  trainingStressScore: {type: Number},
  totalCalories: {type: Number},

  note: {type: String, default: ''},

////////////////////////////////////////
  records: {type: String},
  sessionInfo: {type: String},
  reservedField1: {type: String},
  reservedField2: {type: Number},
  reservedField3: {type: {}},
})

module.exports = model('File', File)