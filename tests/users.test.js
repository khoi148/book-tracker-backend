const app = require("../app");
const request = require("supertest");

test("sample request", async () => {
  await request(app).get("/shouldbenotfound").expect(404);
});
