const {Schema, model, ObjectId} = require("mongoose")


const Polyline = new Schema({
  workout: {type: ObjectId, ref:'File', required: true, index: true},
  fileName: {type: String, required: true},
  user: {type: ObjectId, ref:'User', required: true, index: true},
  type: {type: String, default: 'Polyline'},
  points: {type: []},
  origLength: {type: Number},
  arrayLength: {type: Number},
})

module.exports = model('Polyline', Polyline)