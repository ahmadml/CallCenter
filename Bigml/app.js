const express = require('express')
const app = express();
var server = require('http').createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const port = 6064;
const bigml = require('./bml')
const ml = bigml.getbigmlServiceInstance();
const kafka = require('./kafka_Consumer');

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render("sender",)
  })



//------------ Socket.io ----------------
io.on("connection", (socket) => {

  socket.on("modelinfo", () => {
    ml.initMl();
     socket.emit("redy")
  });

  socket.on("Prediction", (data) => { 
    const result = ml.myPrediction(data);
    result
    .then(data => socket.emit('myPrediction',data))
    .catch(err => console.log(err));
     //console.log(ml.myPrediction(data));
});

});

  server.listen(port, () => console.log(`Listening Socket on http://localhost:6064`));