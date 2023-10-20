//connect to mongoose
const mongoose = require("mongoose");

//create Schema for Stock
const StockSchema = new mongoose.Schema({
  Name: String,
  Status: String,
  Completed: String,
  Quantity: Number,
});

//Export Schema
const StockModel = mongoose.model("stocks", StockSchema);
module.exports = StockModel;
