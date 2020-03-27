const passport = require('passport');
const mongoose = require('mongoose');
const SpotifyStrategy = require('passport-spotify').Strategy;

let { USER } = require('./../models/user');

passport.serializeUser((user, done) => {
  done(null, user._id); // serialize it as a cookie req.user.id
  // id as in mongoose's own id, not the spotify id
});

passport.deserializeUser(async (id, done) => {
  try {
    let user = await USER.findById(id); // find the user in db

    done(null, user);
  } catch (error) {
    console.log(error);
  }
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      proxy: true
    },
    async (accessToken, refreshToken, expires_in, profile, done) => {
      try {
        let existingUser = await USER.findOne({
          // if a user exists with the same id, find it
          user_id: profile.id
        });

        if (existingUser) {
          await USER.findOneAndUpdate(
            { user_id: profile.id },
            { $set: { refresh_token: refreshToken } },
            { new: true }
          );
          return done(null, existingUser);
        }

        let newUser = await new USER({
          user_id: profile.id,
          refresh_token: refreshToken
        }).save(); // if not, save it to db with id and refresh token

        done(null, newUser);
      } catch (error) {
        console.log(error);
      }
    }
  )
);
