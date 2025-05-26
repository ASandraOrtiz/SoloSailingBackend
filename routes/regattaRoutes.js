//routes/regattaRoutes.js
const router = require('express').Router();
const { 
    createRegatta, 
    listRegattas,
    listActiveRegattas,
    joinRegatta
 } = require('../controllers/regattaControllers');
const { authMiddleware } = require('../controllers/userController');

router.use(authMiddleware);
router.post('/', createRegatta);
router.get('/', listRegattas);
router.get("/active", listActiveRegattas);
router.post("/:regattaId/join", joinRegatta);

module.exports = router;