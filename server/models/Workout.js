const {Schema, model, ObjectId} = require("mongoose")

const Workout = new Schema({
  name: {type: String, required: true},
  workoutName: {type: String, required: true},
  type: {type: String, required: true},
  accessLink: {type: String},
  size: {type: Number, default: 0},
  date: {type: Date, default: Date.now()},
  path: {type: String, default: ''},
  user: {type: ObjectId, ref:'User'},
  parent: {type: ObjectId, ref:'File'},
  childs: [{type: ObjectId, ref:'File'}],
  sessionInfo: {type: String},
  sport: {type: String},
  subSport: {type: String},
  timestamp: {type: Date},
  totalDistance: {type: Number, default: 0},
  totalElapsedTime: {type: Number, default: 0},
  avgSpeed: {type: Number, default: 0},
  enhancedAvgSpeed: {type: Number, default: 0},
  totalAscent: {type: Number, default: 0},
  avgHeartRate: {type: Number, default: 0},
  maxHeartRate: {type: Number, default: 0},
  avgPower: {type: Number, default: 0},
  totalCalories: {type: Number, default: 0},
  note: {type: String, default: ''},
  reservedField1: {type: String},
  reservedField2: {type: Number},
  reservedField3: {type: {}},
})

module.exports = model('Workout', Workout)