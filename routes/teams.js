const express = require("express");
const router = express.Router();

const teamsCtrl = require("../controllers/teams");
//shows the home page 
router.get("/", teamsCtrl.index);
// gets the new page to create a new team
router.get("/new", teamsCtrl.new);
// shows the show teams details
router.get("/:id", teamsCtrl.show);
//posts team
router.post("/", teamsCtrl.create);

module.exports = router;
