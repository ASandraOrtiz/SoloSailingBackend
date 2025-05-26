const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    boatNames: { type: [String], required: true },
    minObstacleDistance: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Profile', profileSchema);