const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = require ('./app');

//import controllers
const controller = require("./controllers/vacancyController");
const userController = require("./controllers/userController");

// const app = express();
const port = 8000;

//apply bodyparser to be able to use JSON data. 
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home");
});

//////////////////////////////////////////////////////////////////////////////////
//The below are all the API Middleware for CRUD, specific to User/login page.
//The below is purely for testing. This is used to see if the register works.
app.get("/data", userController.see_users);

//signup
app.post("/register", userController.reg_user);

//login and get token
app.post("/login", userController.get_token);

//See if user has admin rights.
app.get("/admin", userController.if_admin);

//See if user has a toen in order to few user page.
app.get("/user", userController.if_user);


/////////////////////////////////////////////////////////////////////////////////////
// The below are all the API for CRUD Vacancies.
app.get("/all", controller.find_items);

app.get("/getItem/:id", controller.find_item);

app.put("/update/:id", controller.edit_item);

app.post("/add", controller.post_item);

app.delete("/delete/:id", controller.del_item);

////////////////////////////////////////////////////////////////////////////////////
//PORT Listener
app.listen(port, () => {
  console.log("Application up and running on port: " + port);
});
