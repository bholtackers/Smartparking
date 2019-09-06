var express = require('express');
const SerialPort = require('serialport');
const port = new SerialPort('/dev/tty-usbserial1', {
  baudRate: 115200
});
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
