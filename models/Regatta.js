//models\Regatta.js
const mongoose = require('mongoose');

const regattaSchema = new mongoose.Schema({
  owner:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:        { type: String, required: true },
  isLive:      { type: Boolean, default: false },
  participants:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  obstacles:   [obstacleSchema],
  // buoys:       [buoySchema],
  createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('Regatta', regattaSchema);