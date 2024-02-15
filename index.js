const express = require('express');
const mongoose=require ('mongoose'); //mongoose library
const keys=require('./config/keys.js');
const cookieSession=require('cookie-session');
const passport=require('passport');
require('./models/User');
require('./services/passport.js');

mongoose.connect(keys.mongoURI);



const app= express();

app.use(
  cookieSession({
    maxAge:30*24*60^60*1000,   //I want this cookie to last for 30days before it expires
    keys:[keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());


require ('./routes/authRoutes.js')(app);// exports the add to the arrow function in the authRoutes file

//what port should we be listening to
//process.env.PORT => look at the underlying environtment and see if they have declared a port for us to use
const PORT = process.env.PORT || 5000;
//express tells node to listen for traffic comin into PORT
app.listen(PORT);
