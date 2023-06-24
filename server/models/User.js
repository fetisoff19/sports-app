const {Schema, model, SchemaTypes} = require("mongoose")

const User = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  diskSpace: {type: Number, default: 1024**3*10},
  usedSpace: {type: Number, default: 0},
  avatar: {type: String},
  language: {type: String},
  // sports: [{type: String, default: 'all'}],
  stats: {type: SchemaTypes.Mixed},
  info: {type: {}},
  // workouts: [{type: ObjectId, ref:'Workout'}],
  workouts : [],
})

module.exports = model('User', User)