exports.testlog = (data) => {
    try {
        var jsonData = JSON.parse(data);
    } catch (error) {
        return;
    }
    return handleData(jsonData);
}   

var Timer = require('easytimer.js').Timer;
var color = require('colors');

var timerSpot1 = new Timer();
var timerSpot2 = new Timer();
var timerSpot3 = new Timer();
var timerSpot4 = new Timer();


function handleData(data) {
    console.log(data);
    if (data.Car != null) {
        console.log(document.getElementById(data.Car));
    }
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

function selectSpot(spotNumber, numberplate) {
    switch (spotNumber) {
        case '1':
            if (numberplate)
                break;
        case '2':

            break;
        case '3':

            break;
        case '4':

            break;
    }
}