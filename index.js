const app = require("./app");

//listen for requests, on app start
app.listen(process.env.PORT || 3000, function () {
  console.log("now listening for requests");
});
