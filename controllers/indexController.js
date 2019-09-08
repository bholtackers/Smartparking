
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM3', {
    baudRate: 9600
});
const parser = port.pipe(new Readline({
    delimiter: '\n'
}));

var receivedData = [];
// Read the port data
port.on("open", () => {
    console.log('serial port open');
});
parser.on('data', data => {
    console.log('got word from arduino:', data);
});

exports.load = async (req, res) => {
    res.render('index', {
        title: 'Home',
        data: receivedData
    });
}
