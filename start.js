const mongoose = require('mongoose');
const colors = require('colors');


// Connect to our Database and handle any bad connections
mongoose.connect('mongodb://xvLunatic:H0lt8ck3r5@ds048279.mlab.com:48279/smartparking', {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`ERROR: → ${err.message}`.red);
});
mongoose.connection.once('open', function () {
  console.error(`SUCCES: → Connected succesfully`.green);
});

// READY?! Let's go!

// import all of our models
require('./models/User');


// Start our app!
const app = require('./app');
app.set('port', 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
