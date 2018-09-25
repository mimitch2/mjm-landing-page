const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const sessionRoutes = require("./routes/SessionRoutes");
const authenticationRoutes = require("./routes/AuthenticationRoutes");
// const path = require('path');
require("dotenv").config();



mongoose.set("debug", true);
mongoose.Promise = global.Promise;

//************************** set mongodburi in .env file to DB link ****************************/

mongoose.connect(process.env.mongodburi, {useNewUrlParser: true}).then(
  () => { 
    console.log("mongoose connected successfully");
    startWebServer();
  },
  err => {
    console.log("mongoose did not connect",err);
  }
);

//************************** CHANGE ROUTES BELOW ****************************/

// const FooRoutes = require ("./routes/FooRoutes")


//****************** only use this if hosting both app and server on heroku ******/

// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname + '/public/index.html'));
// });

//************ run this below! ********************************************/

function startWebServer(){
  const app = express();

  app.use(bodyParser.json());
  app.use(cors())

  app.get("/api/publicinformation", function (req, res) {
    res.send("Anyone can see this");
  });

  app.use(express.static("public"));
  app.use(bodyParser.json());
  // app.use(FooRoutes);
  app.use(userRoutes);
  app.use(sessionRoutes);
  app.use(authenticationRoutes);

  app.get("/api/canigetthis", function (req, res) {
    res.send("You got the data. You are authenticated");
  });
  app.get("/api/secret", function (req, res) {
    res.send(`The current user is ${req.user.username}`);
  });

  //heroku injects the port number into the PORT env value
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`We are listening on port:${port}`);
  });
  }

// <----------- handle bad request------------->

// app.use(function (request,response) {
//   response.send("NOPE!!!!");
// });
