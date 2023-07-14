const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//one team has many players
//player belongs to one team
//relationship for players and team

const playerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      enum: ["Goalie", "Defender", "Midfielder", "Forward"],
    },
    //a player belongs to user who created it
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: String,
  },
  {
    timestamps: true,
  }
);

// one team

const teamSchema = new mongoose.Schema(
  {
    club: { type: String, required: true },
    country: { type: String, required: true },
    league: { type: String, required: true },
    ucl: { type: Boolean, default: true },
    players: [playerSchema],
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Team", teamSchema);
