var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
const redis = require('ioredis')
const cron = require('node-cron');

const conn = {
    port: 6379,
    host: "127.0.0.1",
    db: 0
};

const redisDb = new redis(conn);

module.exports.addToRedis = (param) => {
    var myObj = JSON.parse(param);
    var Calltime = (myObj.startcall + "")
    var key = Calltime;
    redisDb.lpush(key, myObj.totalWaitingTime, (err, reply) => {
        if (err) throw err;
    })
    if (myObj.Product == "joining") {
        redisDb.lpush("joining", 1, (err, reply) => {
            if (err) throw err;
        })
    }
    else if (myObj.Product == "Service") {
        redisDb.lpush("Service", 1, (err, reply) => {
            if (err) throw err;
        })
    }
    else if (myObj.Product == "complaint") {
        redisDb.lpush("complaint", 1, (err, reply) => {
            if (err) throw err;
        })
    }
    else if (myObj.Product == "Disconnection") {
        redisDb.lpush("Disconnection", 1, (err, reply) => {
            if (err) throw err;
        })
    }
    redisDb.publish("message", param);
}

module.exports.addToRedistotal = (param) => {
    var myObj = JSON.parse(param);
    const date = Date.now();
    const dateTimeFormat = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' })
    const [{ value: hour }, , { value: minute }] = dateTimeFormat.formatToParts(date)
    var key = "set" + hour + ":" + minute
    redisDb.lpush(key, myObj.totalset, (err, reply) => {
        if (err) throw err;
    })
}

module.exports.getToRedis = (key) =>{
    const response = new Promise((resolve, reject) => {
        redisDb.lrange(key,0,-1 ,(err, reply) => {
            if (err) throw err;
          resolve(reply);
        })
      });
         return response;
}

module.exports.deleteall = () =>{
    redisDb.Flushall
}


app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
redisDb.on('connect', function () {
    console.log('Sender connected to Redis');
});
server.listen(6062, function () {
    console.log('Sender is running on port 6062');
});
