const { calculateArea, calculate } = require("./example.js");

test("calculate area with width and length", () => {
  const result = calculateArea(10, 5);
  if (result !== 50) {
    throw new Error("Expect result to be 50 but got:", result);
  }
});

test("test calculate area, with a timeout that returns a promise", (done) => {
  const result = calculate(10, 100).then((result) => {
    expect(result).toBe(1000);
    done();
  });
});

test("testing calculate with async, instead of .then syntax", async () => {
  const result = await calculate(10, 100);
  expect(result).toBe(1000);
});
