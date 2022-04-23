// https://www.cloudkarafka.com/ הפעלת קפקא במסגרת ספק זה

//const uuid = require("uuid");
const Kafka = require("node-rdkafka");
const index = require('./index')
const controller = require('./controllers/controller')

const kafkaConf = {
    "group.id": "cloudkarafka-example",
    "metadata.broker.list": "tricycle-01.srvs.cloudkafka.com:9094,tricycle-02.srvs.cloudkafka.com:9094,tricycle-03.srvs.cloudkafka.com:9094".split(","),
    "socket.keepalive.enable": true,
    "security.protocol": "SASL_SSL",
    "sasl.mechanisms": "SCRAM-SHA-256",
    "sasl.username": "5z56jjqc",
    "sasl.password": "t8bl8_vXDtHKQNJz4t1CeUmAMn80aCoI",
    "debug": "generic,broker,security"
};

const prefix = "5z56jjqc-";
const topic = `${prefix}new`;
//const producer = new Kafka.Producer(kafkaConf);

//const genMessage = m => new Buffer.alloc(m.length,m);
//const prefix = process.env.CLOUDKARAFKA_USERNAME;

const topics = [topic];
const consumer = new Kafka.KafkaConsumer(kafkaConf, {
  "auto.offset.reset": "beginning"
});

consumer.on("error", function (err) {
  console.error(err);
});
consumer.on("ready", function (arg) {
  console.log(`Consumer ${arg.name} ready`);
  consumer.subscribe(topics);
  consumer.consume();
});

consumer.on("data", function (m) {
  const obj = JSON.parse(m.value);
  if(obj.totalset != null) {
    index.sendtosocket(m)
    controller.addtodb(m.value.toString());
    console.log(obj.totalset);
  }
  else if(obj.total != null) {
    index.sendtosocket(m)
    console.log(obj.total);
  }
  else{
    controller.addtodb(m.value.toString());
  console.log(obj.Product);
  }
});

consumer.on("disconnected", function (arg) {
  process.exit();
});
consumer.on('event.error', function (err) {
  console.error(err);
  process.exit(1);
});
consumer.on('event.log', function (log) {
  console.log(log);
});
consumer.connect();