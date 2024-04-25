const express = require("express");
const app = express();
const db = require("./db.js");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body
require("dotenv").config();

app.get("/", function (req, res) {
  res.send("Hello Wellcome to our hotel");
});

//import routers files
const personRouter = require("./routes/PersonRoutes.js");
const menuListRouter = require("./routes/menuListRoutes.js");

//use the routers
app.use("/person", personRouter);
app.use("/menu", menuListRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
