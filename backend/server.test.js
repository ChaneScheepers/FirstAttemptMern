const request = require("supertest");
const server = require("./server");

const app = require("./app");

//The below tests are to check if the login and Register CRUD functions are working 
test("Should reg user", async () => {
  await request(app)
    .post("/register")
    .send({
      username: "userLogin",
      password: "pwd",
    })
    .expect(201);
});

let token = {"token" : "eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiTWF6dml0YSIsInBhc3N3b3JkIjoic2VjcmV0IiwiYWRtaW4iOnRydWV9.NBG8Hw_prUZyuZ5W8t_oXNuuohK4zC5jhiSYhL4o3sE"}
test("Should get token if correct login details", async () => {
  await request(app)
    .post("/login")
    .send({
      username: "Mazvita",
      password: "secret",
    })
    .expect(token);
});

test("Should not log in if incorrect details.", async () => {
  await request(app)
    .post("/login")
    .send({
      username: "Mazvita",
      password: "secret225",
    })
    .expect(403);
});
///////////////////////////////////////
