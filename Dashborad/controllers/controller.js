const redisdb = require('../models/Rrdis_db')
const redisdbR = require('../models/RedisForReciver')

module.exports.deletall = () => {
    redisdb.deleteall()
}

module.exports.addtodb = (data) =>{
    redisdb.addToRedis(data);
}

module.exports.topicscallsfromRedis = () => {
    return redisdbR.prudoctcall();
}

//module.exports.gettopicscalls = redisdbR.ProductCalls;

module.exports.AverageWaitingTime = () => {
    return redisdbR.AverageWaitingTime();
}

module.exports.Callsevery5minutes = (time) => {
    return redisdbR.callsfor5min(time);
}
//module.exports.Standbytime = redisdbR.Standbytime;