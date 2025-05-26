// services/simulator.js
const Boat     = require("../models/Boat");
const GPSData  = require("../models/GPSData");
const WebSocket= require("ws");
const { clients } = require("./websocket");  

async function seedBoats(regattaId, count = 5) {
  const boats = Array.from({ length: count }, (_, i) => ({
    regattaId,
    name:     `Barco #${i + 1}`,
    latitude: 0  + Math.random() * 0.01,
    longitude: 0 + Math.random() * 0.01,
    yaw:      0
  }));
  return Boat.insertMany(boats);
}

function startBoatSimulation(boat) {
  return setInterval(async () => {
    boat.latitude += 0.0001;
    boat.yaw      = (boat.yaw + 5) % 360;
    boat.updatedAt = new Date();
    await boat.save();

    await GPSData.create({
      regattaId: boat.regattaId,
      latitude:  boat.latitude,
      longitude: boat.longitude,
      yaw:       boat.yaw
    });

    const key = boat.regattaId.toString();
    for (let ws of clients.get(key) || []) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          regattaId: boat.regattaId,
          boatId:    boat._id,
          latitude:  boat.latitude,
          longitude: boat.longitude,
          yaw:       boat.yaw,
          timestamp: Date.now()
        }));
      }
    }
  }, 1000);
}

module.exports = { seedBoats, startBoatSimulation };
