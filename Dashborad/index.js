const express = require('express')
const app = express();
const socketIO = require('socket.io');
const controller = require('./controllers/controller')
const cron = require('node-cron');
const port = 5000;
//------ kafka consumer ----------
const consumer = require('./kafka_Consumer');

app.use(express.static('public'))
app.set('view engine', 'ejs')




// Schedule tasks to be run on the server.
cron.schedule('* * * * *', function () {
  const date = Date.now();
  const dateTimeFormat = new Intl.DateTimeFormat('en', { hour: 'numeric',minute: 'numeric' })
  const [{ value: hour }, ,{ value: minute }] = dateTimeFormat.formatToParts(date)
  var modlu = Number(minute) % 10;
  if( modlu == 5 || modlu == 0) {
    var time = hour + ":" + minute;
    var data =  controller.Callsevery5minutes(time);
    io.emit('newdata5min', data)
  }
})


cron.schedule('* * * * * *', function () {
  var data = controller.topicscallsfromRedis();
  io.emit('setdata',  data )
})


cron.schedule('* * * * * *', function () {
  var avr = controller.AverageWaitingTime();
  io.emit('newdata', { districtId: "Standby time", value: avr })
});

cron.schedule('0 0 * * *', function () {
  controller.deletall();
})

module.exports.sendtosocket = (m) =>{
  const obj = JSON.parse(m.value);
  if(obj.totalset != null) {
    io.emit('newdata', { districtId: "Calls waiting", value: obj.totalset })
  }
  else if(obj.total != null) {
    io.emit('newdata', { districtId: "Calls waiting", value: obj.total })
  }
}

app.get('/', (req, res) => {
  var data = {
    cards: [
      { districtId: "Calls waiting", title: "שיחות ממתינות", value: 0, unit: "", fotterIcon: "", fotterText: "", icon: "content_copy" },
      { districtId: "Standby time", title: "זמן המתנה", value: 0, unit: "", fotterIcon: "", fotterText: "", icon: "info_outline" }
    ],
    graphs :[
      { Standbytime5min: [0], hourtime5min: [0]},
    ]
  }
  
  res.render("pages/dashboard", data)
})

const server = express()
  .use(app)
  .listen(port, () => console.log(`Listening Socket on http://localhost:5000`));

  const io = socketIO(server);
//-----------

