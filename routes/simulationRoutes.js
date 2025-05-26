// routes/simulationRoutes.js
const router = require("express").Router({ mergeParams: true });
const { startRegattaSimulation, stopRegattaSimulation } = require("../controllers/simulationController");
const { authMiddleware } = require("../controllers/userController");

router.use(authMiddleware);  

router.post("/simulate/start", startRegattaSimulation);
router.post("/simulate/stop",  stopRegattaSimulation);

module.exports = router;
