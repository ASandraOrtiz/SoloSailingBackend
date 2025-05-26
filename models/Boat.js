// models/Boat.js
const mongoose = require('mongoose');

const boatSchema = new mongoose.Schema({
  regattaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Regatta', required: true },
  name:      { type: String, required: true },
  latitude:  { type: Number, required: true },
  longitude: { type: Number, required: true },
  yaw:       { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Boat', boatSchema);
