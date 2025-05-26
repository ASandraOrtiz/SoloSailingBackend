const router = require("express").Router();
const { getGPSByRegatta, createGPSData, getGPSData } = require("../controllers/gpsController");
const { authMiddleware } = require("../controllers/userController");
router.use(authMiddleware);
router.post("/", createGPSData);
router.get("/simulatedRegattas", getGPSData);
router.get("/regattas/:regattaId/points", getGPSByRegatta);

module.exports = router;