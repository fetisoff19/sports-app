const {Schema, model, ObjectId} = require("mongoose")


const ChartsData = new Schema({
  workout: {type: ObjectId, ref:'File', required: true, index: true},
  fileName: {type: String, required: true},
  type: {type: String, default: 'ChartsData'},
  user: {type: ObjectId, ref:'User', required: true, index: true},
  records: {type: []},
  recordsLength: {type: Number},
  smoothing: {type: Number},
})

module.exports = model('ChartsData', ChartsData)
