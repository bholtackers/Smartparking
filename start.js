const mongoose = require('mongoose');
const colors = require('colors');
const Settings = {
  autoIndex: false, // Don't build indexes
  reconnectTries: 5, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Connect to our Database and handle any bad connections
mongoose.connect('mongodb://smartparking:smartparking1@ds048279.mlab.com:48279/smartparking', Settings);
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
require('./models/Car');


// Start our app!
const app = require('./app');
app.set('port', 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
