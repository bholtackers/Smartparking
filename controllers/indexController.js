const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM5', {
    baudRate: 9600
});
const parser = port.pipe(new Readline({
    delimiter: '\n'
}));

// Read the port data
port.on("open", () => {
    console.log('serial port open');
});
port.on("error", (err) => {
    console.log('Error: ', err.message);
})
parser.on('data', data => {
    console.log('got word from arduino:', data);
});

exports.dashboard = async (req, res) => {
    res.render('index', {
        title: 'dashboard',
        spaces: [{
                id: 1,
                numberplate: 'BH-24-102'
            },
            {
                id: 2,
                numberplate: 'JVK-06-11'
            },
            {
                id: 3,
                numberplate: 'DDK-18-04'
            },
            {
                id: 4,
                numberplate: 'JVB-29-11'
            }
        ]
    });
}
exports.history = async (req, res) => {
    res.render('history', {
        title: 'History',
    });
}