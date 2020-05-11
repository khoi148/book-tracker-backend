const app = require("../app");
const request = require("supertest");
const User = require("../models/userSchema");
require("dotenv").config({ path: "test.env" }); //specify where env is, while using Express

const { userOneId, userOne } = require("./db.js");
const { createUser } = require("../controller/userCont.js");
beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
  //user.save();
});

test("sample request", async () => {
  await request(app).get("/shouldbenotfound").expect(404);
});

test("should register a user/account", async () => {
  //make sure to create a unique new email not in the DB, else error occurs
  await request(app)
    .post("/users")
    .send({
      name: "emiliy123",
      email: "emily" + Math.random() * Math.random() + "@gmail.com",
      password: "12345",
      pwconfirm: "12345",
    })
    .expect(200);
});

test("Testing a failed registration. No Email", async () => {
  //make sure to create a unique new email not in the DB, else error occurs
  await request(app)
    .post("/users")
    .send({
      name: "emiliy123",
      password: "12345",
      pwconfirm: "12345",
    })
    .expect(400);
});

test("Failed Login User", async () => {
  await request(app)
    .post("/login")
    .send({
      email: "fail@gmail.com",
      password: "fail",
    })
    .expect(404);
});

test("Successful login user of Khoa test user", async () => {
  let email = "alex123@gmail.com";
  let pw = "12345";

  await request(app)
    .post("/login")
    .send({
      email: email,
      password: pw,
    })
    .expect(200)
    .then((res) => {
      expect(res.body.data.user.email).toBe("alex123@gmail.com");
    });
});

test("Should get own profile", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0]}`)
    .send()
    .expect(200);
});
