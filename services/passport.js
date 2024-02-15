const passport = require('passport');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const mongoose=require('mongoose');
const keys =require('../config/keys');


const User = mongoose.model('users');   //model class

passport.serializeUser((user,done)=>{
  done(null,user.id);
});

passport.deserializeUser((id,done)=>{
//sercha or quere use model class
  User.findById(id)
    .then(user=>{
      done(null, user);
    });
});


passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
  (accessToken, refreshToken, profile, done) => {
      // console.log('access token', accessToken);
      // console.log('refresh token', refreshToken);
      // console.log('profile:', profile);
      User.findOne({googleId: profile.id})
        .then((existingUser)=>{
          if(existingUser){
            //we already have a record with a given profile Id
            done(null,existingUser);
          }
          else{
            //We dont have a user record with this  Id therefore create a new record

            new User({googleId: profile.id}) // Creates a model instance
            .save()//  saves it to the datbase
            //Every time we do something to a database, we are performing an asyncronous funcition which means we need to check it hs been done  correctly
            .then(user=>done(null,user));//checks
          }
        })



    }
  )
);
