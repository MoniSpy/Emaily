const express= require('express');
const app= express();


//app: object, represents the underlying running express server

//route handler , will be calle anytime a request comes into the '/' route
app.get('/',(req,res)=>{
  res.send({Hola: 'there'});
});


//what port should we be listening to
//process.env.PORT => look at the underlying environtment and see if they have declared a port for us to use
const PORT = process.env.PORT || 5000;
//express tells node to listen for traffic comin into PORT
app.listen(PORT);
