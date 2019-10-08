var GlobalJsonData;

exports.testlog = (data) => {
    try {
        var jsonData = JSON.parse(data);
    } catch (error) {
        return;
    }
    if (typeof jsonData == 'number') {
        console.log(jsonData);
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
    getPlate(data.Spot);
}

exports.getSpotPlate = (numberplateIO) => {
    if (numberplateIO == GlobalJsonData.Car) {
        console.log("Yes");
    } else {
        start.send("alert:"+GlobalJsonData.Car+":Wrong spot, please go to your spot!");
        console.log("Wrong spot, please go to your spot!");
    }
}

function getPlate(spotNumber){
    start.send("getPlate:"+spotNumber);
}

function handleTimer(data){
    switch (data.Status) {
        case "parked":
            timerSpot1.start();
            timerSpot1.addEventListener('secondsUpdated', function (e) {
                console.log(timerSpot1.getTimeValues().toString());
                // $('#'+data.numberplate+'').html(timerSpot1.getTimeValues().toString());
            });
            break;
        case "still parked":
            break;
        case "left":
            timerSpot1.stop();
            break;
    }
}