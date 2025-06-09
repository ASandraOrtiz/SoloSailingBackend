const mongoose = require('mongoose');

const obstacleSchema = new mongoose.Schema({
  //owner:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  latitude:  { type: Number, required: true },
  longitude: { type: Number, required: true },
  type:      { type: String, required: true },
  name:      { type: String },

});
// const buoySchema = new mongoose.Schema({
//   latitude:  { type: Number, required: true },
//   longitude: { type: Number, required: true },
//   name:      { type: String,   required: true }
// });

// module.exports = mongoose.model('Buoy', buoySchema);
module.exports = mongoose.model('Obstacle', obstacleSchema);