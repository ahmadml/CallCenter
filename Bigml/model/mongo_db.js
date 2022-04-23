const { MongoClient } = require('mongodb');
const { create } = require('mathjs');
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");


const uri = "mongodb+srv://ahmadml:ahmad90@cluster0.zhq7s.mongodb.net/callcenter?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports.addToMongoDB = ( param ) => {
    var myObj = JSON.parse( param )
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("callcenter");
        dbo.collection("Calls").insertOne(myObj, function (err, res) {
            if (err) throw err;
            db.close();
        });
    });
}
module.exports.mongoReciver = () => {
 
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("callcenter");
      dbo.collection("Calls").find({}, { projection: { is_special: 0, _id: 0 } }).toArray(function (err, result) {
        if (err) throw err;
        db.close();
        var delayInMilliseconds = 10000; //10 second
        setTimeout(function () {
          createCSV(result)
        }, delayInMilliseconds);
      });
    });
  }

  function createCSV(data) {
    const json2csvParser = new Json2csvParser({ header: true });
    const csvData = json2csvParser.parse(data);
    fs.writeFile("calls2.csv", csvData, function (error) {
      if (error) throw error;
      console.log("Write calls2.csv successfully!");
    });
  }

// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();

// mongoose.connect('mongodb+srv://ahmadml:ahmad90@cluster0.zhq7s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
// .then((result) => {console.log("mongodb conection..");})
// .catch((err) => {console.log(err);})

