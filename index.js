require("dotenv").config({ path: ".env" });
const https = require("https");
const fs = require("fs");
const app = require("./app");
const cors = require("cors");
const path = require("path");
app.use(cors());

const server = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "server.key")),
    cert: fs.readFileSync(path.join(__dirname, "server.cert")),
  },
  app
);
//listen for requests, on app start
server.listen(process.env.PORT, () => {
  console.log("now listening for requests on port " + process.env.PORT);
});
