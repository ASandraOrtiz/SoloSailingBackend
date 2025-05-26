const router = require("express").Router();
const { createObstacle, getAllObstacles, deleteObstacle, exportObstacles, importObstacles } = require("../controllers/obstacleController");
const { authMiddleware } = require("../controllers/userController");

router.use(authMiddleware);
router.post("/",   createObstacle);
router.get("/",    getAllObstacles);
router.delete("/:id", deleteObstacle);
router.get("/export", exportObstacles);
router.post("/import", importObstacles);


module.exports = router;
