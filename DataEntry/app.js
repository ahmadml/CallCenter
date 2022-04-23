// const express = require('express');
// const app = express();
// var server = require('http').createServer(app);
// const io = require("socket.io")(server);
// const port = 3000

// const bodyParser = require('body-parser');
// //const calls = require("./controllers/callcenter_controller.js");
// const dbService = require('./models/callcenter_model');




// app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));


// const path = require("path");
// const livereload = require("livereload");
// const liveReloadServer = livereload.createServer();
// liveReloadServer.watch(path.join(__dirname, 'public'));
 
// const connectLivereload = require("connect-livereload");
// app.use(connectLivereload());
// liveReloadServer.server.once("connection", () => {
//   setTimeout(() => {
//     liveReloadServer.refresh("/");
//   }, 100);
// }); 

// //----------------------------------------

// app.set('view engine', 'ejs');
// app.use(express.static("public"));

// app.get('/', function(req, res) {
    
//     const db = dbService.getDbServiceInstance();

//     const result = db.getAllData();
    
//     // result
//     // .then(data => res.json(data))
//     // .catch(err => console.log(err));


//     result
//     .then(data =>{ res.render('index',{alldata: data})})
//     .catch(err => console.log(err));
    
// });

// //------------ Socket.io ----------------
// io.on("connection", (socket) => {
//     console.log("new user connected");
//     socket.on("totalWaitingCalls", (msg) => { console.log(msg.totalWaiting) });
//     socket.on("callDetails", (msg) => { console.log(msg);/*kafka.publish(msg)*/ });
// });



// server.listen(port, () => console.log(`Ariel app listening at http://localhost:${port}`));


