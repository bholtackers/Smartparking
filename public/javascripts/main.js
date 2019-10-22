var GlobalJsonData;

exports.testlog = (data) => {
    try {
        var jsonData = JSON.parse(data);
    } catch (error) {
        return;
    }
    if (typeof jsonData == 'number') {
        return;
    } else {
        GlobalJsonData = jsonData;
        return handleData(jsonData);
    }
}

var Timer = require('easytimer.js').Timer;
var color = require('colors');

const start = require('../../start');

var timerSpot1 = new Timer();
var timerSpot2 = new Timer();
var timerSpot3 = new Timer();
var timerSpot4 = new Timer();


function handleData(data) {
    if (data.Status == "parked") {
        getPlate(data.Spot);
    } else {
        handleTimer(data);
    }
}

//STUUR CONSTANT NUMMERBORD MEE, GLOBAL WERK NIET FATSOENDELIJK
exports.getSpotPlate = (numberplateIO) => {
    console.log("DEZE " + numberplateIO);
    if (numberplateIO == GlobalJsonData.Car) {
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
                    timerSpot1.stop();
                    break;
                case "2":
                    timerSpot2.stop();
                    break;
                case "3":
                    timerSpot3.stop();
                    break;
                case "4":
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