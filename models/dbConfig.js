const MongoClient = require('mongodb').MongoClient;
const mongoose = require ('mongoose');
const url = "mongodb://localhost:27017/Uber-eats";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
 
    var dbo = db.db("Uber-eats");
    dbo.createCollection("stores", function(err, res) {
      if (!err)
         console.log("Collection stores created successfully");
     else
         console.log("Collection stores exists");
    });

    dbo.createCollection("users", function(err, res) {
        if (!err)
           console.log("Collection users created successfully");
       else
           console.log("Collection users exists");
      });

      dbo.createCollection("user_admins", function(err, res) {
        if (!err)
           console.log("Collection user_admins created successfully");
       else
           console.log("Collection user_admins exists");
      });
      db.close();
  });

mongoose.connect(
    url,
    {useNewUrlParser:true, useUnifiedTopology:true},
    (err)=>{
        if(!err) console.log("Connected successfully to the database !!!");
        else console.log("Connection error : " + err);
    }
)