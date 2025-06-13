//routes/regattaRoutes.js
const router = require('express').Router();
const rc = require('../controllers/regattaControllers');
const { authMiddleware } = require('../controllers/userController');

router.use(authMiddleware);
router.post('/', rc.createRegatta);
router.get('/', rc.listRegattas);
router.get('/:regattaId', rc.getRegattaById);
router.post('/:regattaId/start', rc.startRegatta);
router.post('/:regattaId/stop', rc.stopRegatta);
router.get("/active", rc.listActiveRegattas);
router.post("/:regattaId/join", rc.joinRegatta);

module.exports = router;