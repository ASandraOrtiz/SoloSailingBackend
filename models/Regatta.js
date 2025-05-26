//models\Regatta.js
const mongoose = require('mongoose');

const regattaSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true }, 
    name: String,
    isLive: { type: Boolean, default: false },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: Date
  });

module.exports = mongoose.model('Regatta', regattaSchema);