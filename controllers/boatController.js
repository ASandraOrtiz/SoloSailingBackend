// controllers/boatController.js
const Boat = require('../models/Boat');
exports.listBoats = async (req, res) => {
  const boats = await Boat.find({ regattaId: req.params.regattaId });
  res.json(boats);
};

// exports.createBoat = async (req, res) => {
//     try {
//         const { regattaId } = req.params;
//         const { name, latitude, longitude, yaw } = req.body;
//         const boat = await Boat.create({ regattaId, name, latitude, longitude, yaw });
//         return res.status(201).json(boat);
//     } catch (e) {
//         return res.status(500).json({ error: e.message });
//     }
// };
