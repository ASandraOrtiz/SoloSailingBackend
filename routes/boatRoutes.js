// routes/boatRoutes.js
const router = require("express").Router({ mergeParams: true });
const Boat   = require("../models/Boat");
const { authMiddleware } = require("../controllers/userController");

router.use(authMiddleware);

router.get("/", async (req, res) => {
  const { regattaId } = req.params;
  const boats = await Boat.find({ regattaId });
  res.json(boats);
});

module.exports = router;
