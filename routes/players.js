const express = require("express");
const router = express.Router();

const playersCtrl = require("../controllers/players");
//creates player
router.post("/teams/:id/players", playersCtrl.create);
//puts update on server
router.put("/players/:id", playersCtrl.update);
//grab players id to edit
router.get("/players/:id/edit", playersCtrl.edit);
//deletes player
router.delete("/players/:id", playersCtrl.delete);

module.exports = router;
