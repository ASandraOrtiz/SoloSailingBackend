const mongoose = require("mongoose");

const gpsDataSchema = new mongoose.Schema({
  regattaId: { type: mongoose.Schema.Types.ObjectId, ref: "Regatta", required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  yaw: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("GPSData", gpsDataSchema);
