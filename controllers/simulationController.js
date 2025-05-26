// controllers/simulationController.js
const Boat= require("../models/Boat");
const { seedBoats, startBoatSimulation } = require("../services/simulator");

let intervalsMap = new Map();

exports.startRegattaSimulation = async (req, res) => {
  const { regattaId } = req.params;
  const durationSec = parseInt(req.query.t, 10) || 0;

  if (intervalsMap.has(regattaId)) {
    return res.status(400).json({ message: "Simulación ya en marcha" });
  }
  let boats = await Boat.find({ regattaId });
  if (boats.length === 0) {
    boats = await seedBoats(regattaId, 5);
  }
  const timers = boats.map(b => startBoatSimulation(b));
  intervalsMap.set(regattaId, timers);

  if (durationSec > 0) {
    setTimeout(() => {
      const tt = intervalsMap.get(regattaId) || [];
      tt.forEach(clearInterval);
      intervalsMap.delete(regattaId);
      console.log(`Simulación de regatta ${regattaId} detenida tras ${durationSec}s`);
    }, durationSec * 1000);
  }

  const payload = {
    message:     "Simulación iniciada",
    boatsSeeded: boats.length
  };
  if (durationSec > 0) payload.durationSec = durationSec;
  res.json(payload);
};

exports.stopRegattaSimulation = async (req, res) => {
  const { regattaId } = req.params;
  const timers = intervalsMap.get(regattaId) || [];
  timers.forEach(clearInterval);
  intervalsMap.delete(regattaId);

  await Regatta.findByIdAndUpdate(regattaId, { isLive: false });

  res.json({ message: "Simulación detenida" });
};
