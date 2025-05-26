
const router = require("express").Router();
const { getProfile, updateProfile } = require("../controllers/profileController");
const {authMiddleware} = require("../controllers/userController");
router.use(authMiddleware)
router.get("/", getProfile);
router.put("/", updateProfile);
module.exports = router;