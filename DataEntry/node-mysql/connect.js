// let mysql = require('mysql2');

// let connection = mysql.createConnection({
//     host: 'localhost',
//     port: '3366',
//     user: 'root',
//     password: 'root',
//     database: 'call_center'
// });

// // connection.connect(function(err) {
// //     if (err) {
// //       return console.error('Failed to conenct to mysql db, error: ' + err.message);
// //     }

// //     console.log('Connected to the MySQL server successfully.');
// // });

// connection.connect(function(err) {
//     if (err) throw err;
//     connection.query("SELECT * FROM Customers", function (err, result, fields) {
//       if (err) throw err;
//       console.log(result);
//     });
//   });