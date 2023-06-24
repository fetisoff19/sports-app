const {Schema, model, ObjectId} = require("mongoose")


const PowerCurve = new Schema({
  workout: {type: ObjectId, ref:'File', required: true, index: true},
  fileName: {type: String, required: true},
  type: {type: String, default: 'PowerCurve'},
  user: {type: ObjectId, ref:'User', required: true, index: true},
  points: {type: Map},
})

module.exports = model('PowerCurve', PowerCurve)
