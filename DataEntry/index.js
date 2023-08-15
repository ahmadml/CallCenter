const express = require('express');
const app = express();
var server = require('http').createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const port = 3000

const bodyParser = require('body-parser');
const calls = require("./controllers/callcenter_controller.js");

//------------ kafka------------
const kafka = require('./publish');
//------------



app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

//----------------------------------------

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', function (req, res) {
    res.render('sender')
});

function getCall() {

    const result = calls.getNextCall()
    result
        .then(data => console.log(data))
        .catch(err => console.log(err));

    

}
var date = 0;
//------------ Socket.io ----------------
io.on("connection", (socket) => {
    socket.on("totalWaitingCalls", (msg) => {
        console.log(msg.totalWaiting.totalset);
        kafka.publish(msg.totalWaiting);
        date = msg.totalWaiting.Date;
        calls.recarr();
    });

    socket.on("callDetails", (msg) => { 
        msg.totalWaitingTime = (parseInt(msg.id) - date) / 1000;
        console.log(msg);
        kafka.publish(msg)
        const result =calls.updateById(msg.CusId,msg.prev);
});

    socket.on('getcall', (data) => {
        var totalWaiting = {}
        totalWaiting.total = data;
        kafka.publish(totalWaiting);
        const result = calls.getNextCall()
        result
            .then(data => { socket.emit('call', data);})
            .catch(err => console.log(err));

    });
});

server.listen(port, () => console.log(`Ariel app listening at http://localhost:${port}`));

