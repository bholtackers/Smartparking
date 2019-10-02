const mongoose = require('mongoose');
const Parkingspot = mongoose.model('Parkingspot');
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
    yeet(data)
});

exports.test = async (req,res) => {
    res.redirect('/admin');
}

exports.updateNumberplates = async (req, res, next) => {
    console.log(req.body);
    const update1 = await Parkingspot.findOneAndUpdate(
        { _id: req.body._id1},
        { $set: {numberplate: req.body.Numberplate1, price: req.body.Price}},
    )
    const update2 = await Parkingspot.findOneAndUpdate(
        { _id: req.body._id2},
        { $set: {numberplate: req.body.Numberplate2, price: req.body.Price}},
    )
    const update3 = await Parkingspot.findOneAndUpdate(
        { _id: req.body._id3},
        { $set: {numberplate: req.body.Numberplate3, price: req.body.Price}},
    )
    const update4 = await Parkingspot.findOneAndUpdate(
        { _id: req.body._id4},
        { $set: {numberplate: req.body.Numberplate4, price: req.body.Price}},
    )
    res.redirect('/admin');
}

exports.dashboard = async (req, res) => {
    const spaces = await Parkingspot.find();
    res.render('index', {
        title: 'dashboard',
        spaces
    });
}
exports.history = async (req, res) => {
    res.render('history', {
        title: 'History',
    });
}
exports.admin = async (req, res) => {
    const plates = await Parkingspot.find();
    res.render('admin', {
        title: 'Admin',
        plates
    });
}

yeet = (data) => {
    console.log('got word from arduino:', data);
}