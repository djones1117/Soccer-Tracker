const TeamModel = require("../models/team");


module.exports = {
    index,
    new: newTeam,
    show,
    create,
};

async function index(req, res) {
    const teams = await TeamModel.find({});
    console.log(teams);
    res.render("teams/index", { club: "All Teams", teams: teams});
}

function newTeam(req, res) {
    
    res.render("teams/new", {club: "Add Team", errorMsg: ""});
}


async function show(req, res) {
    console.log(req.user)


    try {


     const teamFromTheDatabase = await TeamModel
                                    .findById(req.params.id)
                                    .populate('players')
                                    .exec();
   
   
     console.log(teamFromTheDatabase);
   
     res.render("teams/show", {
        team: teamFromTheDatabase
     })


        } catch (err) {
            res.send(err);
  } 
}

async function create(req, res) {
     
    req.body.ucl = !!req.body.ucl;

// this applies defaults in the team models
    for (let key in req.body) {
       if (req.body[key] === "") delete req.body[key]; 
    }   
    
    req.body.user = req.user._id
    req.body.userName = req.user.name;
   // has to be before we send our model to the database or will result in validation error because we required users to be true in our model
   
    try {    //waiting for the TeamModel to go to our database and put the forms info in the database
        const teamFromTheDatabase = await TeamModel.create(req.body);
    
    
        console.log(teamFromTheDatabase); //what you posted on server

        //!!!REDIRECT after CUDing Data!!!
        res.redirect(`/teams/${teamFromTheDatabase._id}`);
   
    } catch (err) {
        
        console.log(err); //checks for error
       
        res.render("teams/new", { errorMsg: err.message });
    }

}
