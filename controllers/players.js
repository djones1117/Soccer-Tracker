const TeamModel = require('../models/team');


module.exports = {
    create,
}

async function create(req, res){
    console.log(req.body)
    try {

        const teamFromTheDatabase = await TeamModel.findById(req.params.id)

        req.body.user = req.user._id
        req.body.userName = req.user.name;

        teamFromTheDatabase.players.push(req.body);

        await teamFromTheDatabase.save();

        console.log(teamFromTheDatabase)

        res.redirect(`/teams/${req.params.id}`)


    } catch(err){
        res.send(err)
    }
}