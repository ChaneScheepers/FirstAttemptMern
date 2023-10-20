const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const StockModel = require("./model/model");

const controller = require("./controllers/controller");

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

//The below are usernames, passwords and userroles (Very standard)
let userDatabase = [
  {
    username: "Mazvita",
    password: "secret",
    admin: true,
  },
  {
    username: "Meagan",
    password: "secret",
    admin: false,
  },
  {
    username: "Kabelo",
    password: "secret",
    admin: false,
  },
];

//middleware
app.get("/", (req, res) => {
  res.send("Home");
});

//login and get token
app.post("/login", (req, res) => {
  const userLogin = req.body.username;
  const pwd = req.body.password;

  const userIndex = userDatabase.findIndex(
    (index) => index.username == userLogin
  );

  if (userIndex > -1 && pwd == userDatabase[userIndex].password) {
    let payload = {
      name: userLogin,
      password: pwd,
      admin: userDatabase[userIndex].admin,
    };

    const token = jwt.sign(JSON.stringify(payload), "jwt-secret-task2", {
      algorithm: "HS256",
    });
    res.send({
      token: token,
    });
  } else {
    res.status(403).send({
      err: "user not Authenticated.",
    });
  }
});

//admin page.
app.get("/admin", (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  try {
    const decoded = jwt.verify(token, "jwt-secret-task2");

    const accessIndex = decoded.admin;

    if (accessIndex) {
      res.send({
        msg: "Welcome Admin",
        access: true,
      });
    } else {
      res.status(403).send({
        msg: "Your Account is verified, but you do not have access to this page.",
      });
    }
  } catch (err) {
    res.sendStatus(401);
    console.log(err);
  }
});

app.get("/user", (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  try {
    const decoded = jwt.verify(token, "jwt-secret-task2");
    const user = decoded.name;
    const isAdmin = decoded.admin;

    console.log(user);
    console.log(isAdmin);

    const accessPerson = decoded.name.indexOf(user);

    console.log(accessPerson);

    if (accessPerson > -1) {
      res.send({
        msg: "Success! Welcome " + user,
        user: user,
        admin: isAdmin,
      });
    } else {
      res.status(403).send({
        msg: "You Account is verified, but you do not have access to this page.",
      });
    }
  } catch (err) {
    res.sendStatus(401);
    console.log(err);
  }
});

////
app.get("/all", controller.find_items);

app.get("/getItem/:id", (req, res) => {
  const id = req.params.id;
  StockModel.findById({ _id: id })
    .then((tasks) => res.json(tasks))
    .catch((err) => res.json(err));
});


app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  StockModel.findByIdAndUpdate(
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
});

app.post("/add", (req, res) => {
  try {
    StockModel.create(req.body);
    console.log(req.body);
    res.status(201).send({
      msg: "Added",
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  StockModel.findByIdAndDelete({ _id: id })
    .then((stock) => res.json(stock))
    .catch((err) => res.json(err));
});

app.listen(port, () => {
  console.log("Application up and running on port: " + port);
});
