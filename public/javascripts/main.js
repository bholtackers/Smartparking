var GlobalJsonData;

exports.testlog = (data) => {
    try {
        var jsonData = JSON.parse(data);
    } catch (error) {
        return;
    }
    if (typeof jsonData == 'number') {
        console.log(data);
        return;
    } else {
        GlobalJsonData = jsonData;
        return handleData(jsonData);
    }
}

var Timer = require('easytimer.js').Timer;
var color = require('colors');

const start = require('../../start');
const indexController = require('../../controllers/indexController');

var timerSpot1 = new Timer();
var timerSpot2 = new Timer();
var timerSpot3 = new Timer();
var timerSpot4 = new Timer();

var spotPlates = [];

function handleData(data) {
    if (data.Status == "parked") {
        getPlate(data.Spot);
    } else {
        handleTimer(data);
    }
}

exports.getSpotPlate = (numberplateIO) => {
    console.log("DEZE " + numberplateIO);
    var array = numberplateIO.split(":");
    if (array[0] == GlobalJsonData.Car) {
        spotPlates[array[1]] = array[0];
        handleTimer(GlobalJsonData);
    } else if (GlobalJsonData.Car != undefined && GlobalJsonData.Car != "undefined") {
        start.send("alert:" + GlobalJsonData.Car + ":Wrong spot, please go to your spot!");
    }
}

function getPlate(spotNumber) {
    start.send("getPlate:" + spotNumber);
}

function handleTimer(data) {
    switch (data.Status) {
        case "parked":
            switch (data.Spot) {
                case "1":
                    timerSpot1.start();
                    timerSpot1.addEventListener('secondsUpdated', function (e) {
                        start.send("updateTime:" + data.Spot + ":" + timerSpot1.getTimeValues().toString())
                    });
                    break;
                case "2":
                    timerSpot2.start();
                    timerSpot2.addEventListener('secondsUpdated', function (e) {
                        start.send("updateTime:" + data.Spot + ":" + timerSpot2.getTimeValues().toString())
                    });
                    break;
                case "3":
                    timerSpot3.start();
                    timerSpot3.addEventListener('secondsUpdated', function (e) {
                        start.send("updateTime:" + data.Spot + ":" + timerSpot3.getTimeValues().toString())
                    });
                    break;
                case "4":
                    timerSpot4.start();
                    timerSpot4.addEventListener('secondsUpdated', function (e) {
                        start.send("updateTime:" + data.Spot + ":" + timerSpot4.getTimeValues().toString())
                    });
                    break;
            }

            break;
        case "left":
            switch (data.Spot) {
                case "1":
                    var duration = timerSpot1.getTimeValues().toString();
                    indexController.addHistorySpot(duration, spotPlates[1]);
                    start.send("Leave:1");
                    timerSpot1.stop();
                    break;
                case "2":
                    indexController.addHistorySpot(duration, spotPlates[2]);
                    start.send("Leave:2");
                    timerSpot2.stop();
                    break;
                case "3":
                    indexController.addHistorySpot(duration, spotPlates[3]);
                    start.send("Leave:3");
                    timerSpot3.stop();
                    break;
                case "4":
                    indexController.addHistorySpot(duration, spotPlates[4]);
                    start.send("Leave:4");
                    timerSpot4.stop();
                    break;
            }
            break;
        case "Still parked":
            switch (data.Spot) {
                case "1":
                    timerSpot1.addEventListener('secondsUpdated', function (e) {
                        start.send("updateTime:" + data.Spot + ":" + timerSpot1.getTimeValues().toString())
                    });
                    break;
                case "2":
                    timerSpot2.addEventListener('secondsUpdated', function (e) {
                        start.send("updateTime:" + data.Spot + ":" + timerSpot2.getTimeValues().toString())
                    });
                    break;
                case "3":
                    timerSpot3.addEventListener('secondsUpdated', function (e) {
                        start.send("updateTime:" + data.Spot + ":" + timerSpot3.getTimeValues().toString())
                    });
                    break;
                case "4":
                    timerSpot4.addEventListener('secondsUpdated', function (e) {
                        start.send("updateTime:" + data.Spot + ":" + timerSpot4.getTimeValues().toString())
                    });
                    break;
            }
    }
}
