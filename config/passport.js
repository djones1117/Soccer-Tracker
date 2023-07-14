const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const UserModel = require("../models/user");
//Require your User Model here!

// configuring Passport!
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    async function (accessToken, refreshToken, profile, cb) {
      // a user has logged in via OAuth!

      try {
        let userDoc = await UserModel.findOne({ googleId: profile.id });

        if (userDoc) return cb(null, userDoc);

        userDoc = await UserModel.create({
          name: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value,
        });
        return cb(null, userDoc);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (userId, cb) {
  const user = await UserModel.findById(userId);
  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will
  cb(null, user); // be availible in every Single controller function, so you always know the logged in user
});
