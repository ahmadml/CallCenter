const mongodb = require('../model/mongo_db')

module.exports.addtodb = (data) =>{
    mongodb.addToMongoDB(data);
}

module.exports.datatocsv = () =>{
    mongodb.mongoReciver()
}