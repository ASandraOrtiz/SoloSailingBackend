const mongoose = require('mongoose');

const obstacleSchema = new mongoose.Schema({
  owner:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  latitude:  { type: Number, required: true },
  longitude: { type: Number, required: true },
  type:      { type: String, required: true },
  name:      { type: String },

});

module.exports = mongoose.model('Obstacle', obstacleSchema);