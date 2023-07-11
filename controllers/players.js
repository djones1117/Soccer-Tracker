const TeamModel = require('../models/team');


module.exports = {
    create,
    delete: deletePlayer
}

async function deletePlayer(req, res, next){




    try {
                    //find the team with the players
        const teamXi = await TeamModel.findOne({'players._id': req.params.id, 'players.user': req.user._id});

        if(!teamXi) return res.redirect('/teams') //redirect user thats not logged in to teams page

        teamXi.players.remove(req.params.id); //removes the player from the teams-players array

        await teamXi.save(); //saves changes in db

        res.redirect(`/teams${teamXi._id}`);


    } catch(err){
        next(err)
    }
     
}







async function create(req, res){
    console.log(req.body)
    try {
    // creating a player 
       // find the team from the database
        const teamFromTheDatabase = await TeamModel.findById(req.params.id)

        req.body.user = req.user._id   //logged in user properties
        req.body.userName = req.user.name;
       //add the player to the team
        teamFromTheDatabase.players.push(req.body);

        await teamFromTheDatabase.save(); //telling mongo to save the info 

        console.log(teamFromTheDatabase)

        res.redirect(`/teams/${req.params.id}`)


    } catch(err){
        res.send(err)
    }
}