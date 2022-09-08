const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const url = process.env.MONGO_URI;

mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log("Connected successfully to the database !!!");
    else console.log("Connection error : " + err);
  }
);
