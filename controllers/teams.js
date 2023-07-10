const TeamModel = require("../models/team");


module.exports = {
    index,
};

async function index(req, res) {
    const teams = await TeamModel.find({});
    console.log(teams);
    res.render("teams/index", { title: "All Teams", teams: teams});
}