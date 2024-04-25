const mongoose = require("mongoose");
require("dotenv").config();
// const mongoURl = "mongodb://127.0.0.1:27017/hotel";
const mongoURl = process.env.MONGODB_URL;

mongoose.connect(mongoURl);

var db = mongoose.connection;

db.on("connected", () => {
  console.log("connected to the mongodb server");
});
db.on("error", (err) => {
  console.log("Mongodb conecton error", err);
});
db.on("disconnected", () => {
  console.log("Mongodb disconnected");
});

module.exports = db;
