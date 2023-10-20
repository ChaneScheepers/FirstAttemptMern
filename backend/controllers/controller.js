const mongoose = require("mongoose");
const StockModel = require("../model/model");

//Connect with Mongoose added access to be able to access it from anywhere as requested. The below link will be downloaded after a few days
mongoose.connect(
  "mongodb+srv://chanescheep:Wanda1970@cluster0.scpjzms.mongodb.net/"
);

//Get all
module.exports.find_items = (req, res) => {
  StockModel.find({})
    .then((item) => res.json(item))
    .catch((err) => res.json(err));
};

//Post - add new
module.exports.post_item = (req, res) => {
  const name = req.body.name;
  const status = req.body.status;
  const completed = req.body.completed;
  const quantity = req.body.quantity;
  try {
    StockModel.create(name, status, completed, quantity);
    console.log(req.body);
    console.log(name);
  } catch (err) {
    console.log(err);
  }
};

// get specific by ID
module.exports.find_item = (req, res) => {
  const id = req.params.id;
  StockModel.findById({ _id: id })
    .then((Stock) => res.json(Stock))
    .catch((err) => res.json(err));
};

//Delete specific by ID
module.exports.del_item = (req, res) => {
  const id = req.params.id;
  StockModel.findByIdAndDelete({ _id: id })
    .then((Stock) => res.json(Stock))
    .catch((err) => res.json(err));
};

//Put - change spesific by ID
module.exports.edit_item = (req, res) => {
  const id = req.params.id;
  StockModel.findByIdAndUpdate({ _id: id })
    .then((Stock) => res.json(Stock))
    .catch((err) => res.json(err));
};
