const express = require('express')
const router = express.Router();

const playersCtrl = require('../controllers/players')


router.post('/teams/:id/players', playersCtrl.create);
router.delete('/players/:id', playersCtrl.delete);


module.exports = router;