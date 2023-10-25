//The below middleware is used in the server.js file. This CRUD is used to alter vacancy data and is connected to the mongoDB database.
const mongoose = require("mongoose");
const VacancyModel = require("../model/model");

//Connect with Mongoose added access to be able to access it from anywhere. The below will be removed
mongoose.connect(
  "mongodb+srv://chanescheep:Wanda1970@cluster0.scpjzms.mongodb.net/"
);

//Get all vacancies. This will be used to display information to the users once logged in.
module.exports.find_items = (req, res) => {
  VacancyModel.find({})
    .then((item) => res.json(item))
    .catch((err) => res.json(err));
};

//Post - add new vacancy (Only admin has CRUD rights)
module.exports.post_item = (req, res) => {
  try {
    VacancyModel.create(req.body);
    console.log(req.body);
    res.status(201).send({
      msg: "Added",
    });
  } catch (err) {
    console.log(err);
  }
};

// Get specific vacancy - Used to edit
module.exports.find_item = (req, res) => {
  const id = req.params.id;
  VacancyModel.findById({ _id: id })
    .then((Stock) => res.json(Stock))
    .catch((err) => res.json(err));
};

//Delete specific vacancy
module.exports.del_item = (req, res) => {
  const id = req.params.id;
  VacancyModel.findByIdAndDelete({ _id: id })
    .then((Stock) => res.json(Stock))
    .catch((err) => res.json(err));
};

//Put - Change/update spesific vacancy.
module.exports.edit_item = (req, res) => {
  const id = req.params.id;
  VacancyModel.findByIdAndUpdate(
    { _id: id },
    {
      Name: req.body.Name,
      Status: req.body.Status,
      Completed: req.body.Completed,
      Quantity: req.body.Quantity,
    }
  )
    .then((cars) => res.json(cars))
    .catch((err) => res.json(err));
};
