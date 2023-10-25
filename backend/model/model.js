//connected to mongoose in order to use data from mongoDB
const mongoose = require("mongoose");

//create Schema for vacancies.
const VacancySchema = new mongoose.Schema({
  Name: String, //Name of position
  Status: String, //What is the status of the role. (Interviewing, drafting JD ...)
  Completed: String, //Is the role in final stages?
  Quantity: Number, //How many roles are open.
});

//Export Schema. This is futher used in the controller file.
const VacancyModel = mongoose.model("stocks", VacancySchema);
module.exports = VacancyModel;
