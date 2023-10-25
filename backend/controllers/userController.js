const jwt = require("jsonwebtoken");

//The below list is an internal DB of all the users for this system, along with their admin rights. Admin is able to preform CRUD. Where a user can only view information.
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

//The below middleware is to add a user to the above list. All new individuals will be added with no admin rights.
module.exports.reg_user = (req, res) => {
  const userLogin = req.body.username;
  const pwd = req.body.password;

  let newUser = { username: userLogin, password: pwd, admin: false };

  userDatabase.push(newUser);

  res.status(201).send("User added");
};

//The below is only used to test if a user is being added.
module.exports.see_users = (req, res) => {
  res.json(userDatabase);
};

//The below is used when a user wants to login. If the details is correct and exists in the database a token is generated. This token will be used to assess rights.
module.exports.get_token = (req, res) => {
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
//I would have saved the JWT token in an env file, however for the purpose of this task I have kept it open.
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
};

//The below middleware is used to read a token in order to see if the user has admin rights.
module.exports.if_admin = (req, res) => {
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
};

//The below is used to see if a token is valid. If valid it takes the user to the next stage in the website.
module.exports.if_user = (req, res) => {
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
};
