const mongoose = require('mongoose');
const main = require('../public/javascripts/main');
const Parkingspot = mongoose.model('Parkingspot');
const History = mongoose.model('History');
const colors = require('colors');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM3', {
    baudRate: 9600
});

const parser = port.pipe(new Readline({
    delimiter: '\n'
}));

// Read the port data
port.on("open", () => {
    console.log('serial port open'.cyan);
});
port.on("error", (err) => {
    console.log('Error: ', err.message);
})
parser.on('data', data => {
    sendData(data);
});

exports.updateNumberplates = async (req, res, next) => {
    console.log(req.body);
    const update1 = await Parkingspot.findOneAndUpdate({
        _id: req.body._id1
    }, {
        $set: {
            numberplate: req.body.Numberplate1,
            price: req.body.Price
        }
    }, )
    const update2 = await Parkingspot.findOneAndUpdate({
        _id: req.body._id2
    }, {
        $set: {
            numberplate: req.body.Numberplate2,
            price: req.body.Price
        }
    }, )
    const update3 = await Parkingspot.findOneAndUpdate({
        _id: req.body._id3
    }, {
        $set: {
            numberplate: req.body.Numberplate3,
            price: req.body.Price
        }
    }, )
    const update4 = await Parkingspot.findOneAndUpdate({
        _id: req.body._id4
    }, {
        $set: {
            numberplate: req.body.Numberplate4,
            price: req.body.Price
        }
    }, )
    res.redirect('/admin');
}

exports.goToDash = async (req, res) => {
    res.redirect('/dashboard');
}

exports.dashboard = async (req, res) => {
    const spaces = await Parkingspot.find();
    res.render('index', {
        title: 'dashboard',
        spaces
    });
}
exports.history = async (req, res) => {
    //Gets the price from the database
    var EntireHistory = await History.find();
    res.render('history', {
        title: 'History',
        EntireHistory
    });
}

exports.admin = async (req, res) => {
    const plates = await Parkingspot.find();
    res.render('admin', {
        title: 'Admin',
        plates
    });
}

exports.addHistorySpot = async (Duration, Numberplate) => {

    //turn Duration into array
    var durationarray = Duration.split(":");

    //change array values to int
    var sentHours = parseInt(durationarray[0]);
    var sentMinutes = parseInt(durationarray[1]);
    var sentSeconds = parseInt(durationarray[2]);
    //creates Exit/exit time
    var Exit = new Date();

    //changes to +1 hour because new Date() is kinda lame and doesn't get that concept
    Exit.setHours(Exit.getHours() + 1)

    //Splits up the hours, minutes and seconds for calculations later
    var ExitHours = Exit.getHours();
    var ExitMinutes = Exit.getMinutes();
    var ExitSeconds = Exit.getSeconds();

    //create date that we will changing about
    var Entry = new Date();

    //sets the correct timestamps for the entry time
    Entry.setHours(ExitHours - sentHours);
    Entry.setMinutes(ExitMinutes - sentMinutes);
    Entry.setSeconds(ExitSeconds - sentSeconds);

    //Gets the price from the database
    var PricePerHour = await Parkingspot.find({
        numberplate: "BH-24-02",
    }, function (err, docs) {});
    PricePerHour = PricePerHour[0].price;

    //Converts the duration to Full hours for easy calculation
    var totalHours = sentHours + (sentMinutes / 60) + (sentSeconds / 3600);

    //Calculates the price
    var Price = (totalHours * PricePerHour).toFixed(2);
    Entry = Entry.getFullYear() + "-" + (Entry.getMonth() + 1) + "-" + Entry.getDate() + " " + Entry.getHours() + ":" + Entry.getMinutes() + ":" + Entry.getSeconds()
    Exit = Exit.getFullYear() + "-" + (Exit.getMonth() + 1) + "-" + Exit.getDate() + " " + Exit.getHours() + ":" + Exit.getMinutes() + ":" + Exit.getSeconds()
    //Creates the new item for the database
    const newHistory = await new History({
        Entry,
        Exit,
        Duration,
        Price,
        PricePerHour,
        Numberplate
    });
    newHistory.save(function (err) {
        if (err) {
            console.log(err);
            return;
        }
    })
}

sendData = (data) => {
    main.testlog(data);
}
