const app = require("../app");
const request = require("supertest");
const User = require("../models/userSchema");
require("dotenv").config({ path: "test.env" }); //specify where env is, while using Express
//
beforeEach(async () => {
  await User.deleteMany();
  // const user = User.create({
  //   email: "khoatest@gmail.com",
  //   name: "khoatest",
  //   password: "12345",
  // });
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
      email: "test@yahoo.com",
      password: "12345",
    })
    .expect(404);
});

test("Successful login user of Khoa test user", async () => {
  let email = "khoa@yahoo.com";
  let pw = "12345";
  let name = "khoatest";
  const user = await User.create({
    email: email,
    name: name,
    password: pw,
  });
  await request(app)
    .post("/login")
    .send({
      email: email,
      password: pw,
    })
    .expect(200);
});
