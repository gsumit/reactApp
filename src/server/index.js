const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();

var cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

var db = require("./model/db.js");

var routes = require("./routes/approutes"); //importing route
routes(app); //register the route

app.get("/api/greeting", (req, res) => {
  const name = req.query.name || "World";
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.post("/api/v1/getback", (req, res) => {
  console.log(req.body);
  res.send({ ...req.body });
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
