const { Console } = require('console');
var express = require('express');
const cron = require('node-cron');
var app = require('express')();
var server = require('http').Server(app);
const Redis = require('ioredis')
const redisDb = require('./Rrdis_db');
const { disconnect } = require('process');
//var redis = require('redis');
//const { myPrediction } = require('./bigML');
//var redisClient = redis.createClient();
//var sub = redis.createClient()
const redis = new Redis();
redis.subscribe('message');

// const conn = {
//     port: 6379,
//     host: "127.0.0.1",
//     db: 0
// };

// const redisDb = new redis(conn);

app.get('/', (req, res) => res.send('Hello World!'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var totalwaitingcall = [[], [], [], [], [], [], [], [], [], []];
var Standbytime = [[], [], [], [], [], [], [], [], [], []];

module.exports.AverageWaitingTime = () => {
    for (let i = 0; i < 10; i++) {
        const date = Date.now() - (60 * 1000 * i);
        const dateTimeFormat = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' })
        const [{ value: hour }, , { value: minute }] = dateTimeFormat.formatToParts(date)
        var key = hour + ":" + minute
        var keyset = "set" + hour + ":" + minute
        var st_time = redisDb.getToRedis(key);
        st_time
            .then(data => { Standbytime[i] = data; })
            .catch(err => console.log(err));
        var total_wating = redisDb.getToRedis(keyset);
        total_wating
            .then(data => { totalwaitingcall[i] = data; })
            .catch(err => console.log(err));
    }
    var totalwaitime = 0
    var count_calls = 0
    var count_wtaitingformin = 0;
    for (var i = 0; i < 10; i++) {
        for (let j = 0; j < Standbytime[i].length; j++) {
            if (Standbytime[i].length > 0) {
                count_calls++;
                count_wtaitingformin += Number(Standbytime[i][j]);
            }
        }
    }
    if (count_calls > 0){ totalwaitime = count_wtaitingformin / count_calls;}
    return totalwaitime/60
};

module.exports.callsfor5min = (time) =>{
    var totalcalls5min = {};
    var totalwaitime5min = 0
    var countwaitime5min = 0;
    totalcalls5min.time = [];
    totalcalls5min.Standby = [];
    totalcalls5min.total = [];
    totalcalls5min.time.push(time)
    for (let i = 0; i <= 4; i++){
      for (let j = 0; j < Standbytime[i].length; j++) {
        totalwaitime5min +=  Number(Standbytime[i][j]);
      }
      countwaitime5min += Standbytime[i].length;
    }
    if(totalwaitime5min > 0) {
      totalcalls5min.Standby.push(totalwaitime5min)
      totalcalls5min.total.push(countwaitime5min)
    }
    else {
      totalcalls5min.Standby.push(0)
      totalcalls5min.total.push(0)
    }
    return totalcalls5min;
}

var ProductCalls = {};
module.exports.prudoctcall = () => {
    var joining = redisDb.getToRedis("joining");
    joining.then(data => ProductCalls.joining = data.length)
    var complaint = redisDb.getToRedis("complaint");
    complaint.then(data => ProductCalls.complaint = data.length)
    var Disconnection = redisDb.getToRedis("Disconnection");
    Disconnection.then(data => ProductCalls.Disconnection = data.length)
    //console.log(ProductCalls);
    return ProductCalls;
}

//Schedule tasks to be run on the server.
// cron.schedule('* * * * *', function () {
//     const date = Date.now();
//     const dateTimeFormat = new Intl.DateTimeFormat('en', { minute: 'numeric' })
//     const [{ value: minute }] = dateTimeFormat.formatToParts(date)
//     //console.log("mint now :",Number(minute));
//     var modlu = Number(minute) % 10;
//     while(totalwaitingcall[modlu].length){totalwaitingcall[modlu].pop()}

// });

// redis.on("message", function (channel, data) {
//     //console.log("Got the Massage", data);
//     var data = JSON.parse(data)
//     var minute = (data.startcall + "").split(":");
//     //console.log(minute);
//     var modlu = minute[1] % 10;
//     //console.log(modlu);
//     //console.log(data.totalWaitingTime);
//     totalwaitingcall[modlu].push(data.totalWaitingTime);
//     //console.log("waiting",totalwaitingcall[modlu].toString());    
// });

//module.exports.waitingtime = totalwaitingcall;
//module.exports.Standbytime = Standbytime;
//module.exports.ProductCalls = ProductCalls;



function exit(myList, j) {

}
redis.on('connect', function () {
    console.log('Reciver connected to Redis');
});
server.listen(6061, function () {
    console.log('reciver is running on port 6061');
});