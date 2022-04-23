const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");

var Calls_arr = [];
var dis = 0
var joi = 0
var com = 0
function sim() {
    const Period_type_arr = ["Summer_vacation", "Holidays", "Normal_days"];
    const Topics_arr = ["joining", "Service", "complaint", "Disconnection"];
    const citys_arr = ["ntanya", "hedera", "hefa", "telaviv", "ariel", "ashklon", "karmel", "jatt", "qara", "bat-yam", "ashdod"];
    var i = 0;
    //setInterval(function () {

    for (let index = 0; index < 1000; index++) {



        var temp_age = Math.floor(Math.random() * 30) + 20;
        var temp_PrevCall = Math.floor(Math.random() * 30) + 1;
        var temp_Period_type = Period_type_arr[Math.floor(Math.random() * 3)];
        var temp_Topics = Topics_arr[Math.floor(Math.random() * 4)];
        var temp_citys = citys_arr[Math.floor(Math.random() * 11)];
        var temp_Gender = Math.floor(Math.random() * 2);
        var temp_hour = Math.floor(Math.random() * 24).toString() + ":" + Math.floor(Math.random() * 6).toString() + Math.floor(Math.random() * 10).toString();
        var getHour = temp_hour.substr(0, temp_hour.indexOf(':'));
        if (temp_Gender == 0) {
            temp_Gender = "male"
        }
        else {
            temp_Gender = "female"
        }
        //console.log(i)
        //var myRandom = Math.random()

        if ((temp_citys == 'ntanya' || temp_citys == 'hedera' || temp_citys == 'hefa' || temp_citys == 'bat-yam')
            && (temp_Gender == "male") && (temp_PrevCall > 15) && (temp_age > 25)) {
            temp_Topics = "Disconnection"
            dis++
        }
        if ((temp_citys == 'telaviv' || temp_citys == 'ariel' || temp_citys == 'ashklon' || temp_citys == 'ashdod')
            && (temp_Gender == "female") && (temp_PrevCall < 15) && (temp_age < 30 && temp_age > 20)) {
            temp_Topics = "joining"
            joi++
        }
        if ((temp_citys == 'karmel' || temp_citys == 'jatt' || temp_citys == 'qara')
            && (temp_Gender == "female") && (temp_PrevCall > 5 && temp_PrevCall < 16)) {
            temp_Topics = "complaint"
            com++
        }

        // if ((temp_day == 'Sunday' || temp_day == 'Monday' || temp_day == 'Tuesday') && (temp_car == 'Truck')) {
        //     if (myRandom < 0.8) {
        //         temp_sec_exit = 2
        //     }
        // }
        // if ((temp_day == 'Sunday' || temp_day == 'Monday' || temp_day == 'Tuesday') && (temp_car == 'Private')) {
        //     if (myRandom < 0.8) {
        //         temp_sec_exit = 3
        //     }
        // }
        // if ((temp_day == 'Wendsday' || temp_day == 'Thursday' || temp_day == 'Friday') && (temp_car == 'Van')) {
        //     if (myRandom < 0.8) {
        //         temp_sec_exit = 4
        //     }
        // }
        // if ((temp_day == 'Wendsday' || temp_day == 'Thursday' || temp_day == 'Friday') && (temp_car == 'Truck')) {
        //     if (myRandom < 0.8) {
        //         temp_sec_exit = 5
        //     }
        // }
        // if ((temp_day == 'Wendsday' || temp_day == 'Thursday' || temp_day == 'Friday') && (temp_car == 'Private')) {
        //     if (myRandom < 0.8) {
        //         temp_sec_exit = 1
        //     }
        // }

        // if (temp_day == 'Saturday' && parseInt(getHour) >= 12) {
        //     if (myRandom < 0.8) {
        //         temp_sec_exit = 5
        //     }
        // }

        // if (temp_day == 'Saturday' && parseInt(getHour) <= 12) {
        //     if (myRandom < 0.8) {
        //         temp_sec_exit = 1
        //     }
        // }
        // if (temp_sec_enter == 1) {
        //     if (myRandom < 0.8) {
        //         temp_sec_exit = 2
        //     }
        // } if (temp_sec_enter == 2) {
        //     if (myRandom < 0.8) {
        //         temp_sec_exit = 3
        //     }
        // }
        // if (temp_sec_enter == 3) {
        //     if (myRandom < 0.8) {
        //         temp_sec_exit = 4
        //     }
        // } if (temp_sec_enter == 5) {
        //     if (myRandom < 0.8) {
        //         temp_sec_exit = 1
        //     }
        // } if (temp_sec_enter == 4) {
        //     if (myRandom < 0.8) {
        //         temp_sec_exit = 5
        //     }
        // }
        var e = {};
        e.age = temp_age;
        e.PrevCall = temp_PrevCall;
        e.city = temp_citys;
        e.hour = temp_hour;
        e.gander = temp_Gender;
        e.Period_type = temp_Period_type
        e.topic = temp_Topics;
        i++
        Calls_arr.push(e);
        //}, 10);
    }
}

sim();
console.log("dis", dis);
console.log("joi",joi);
console.log("com",com);
//console.log(Calls_arr);

function createCSV(data) {
    const json2csvParser = new Json2csvParser({ header: true });
    const csvData = json2csvParser.parse(data);
    fs.writeFile("calls1.csv", csvData, function (error) {
        if (error) throw error;
        console.log("Write pred.csv successfully!");
    });
}
createCSV(Calls_arr)


