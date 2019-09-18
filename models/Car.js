const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const carSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: 'You must supply an owner',
    },
    numberplate: {
        type: String,
        required: 'You must supply a numberplate'
    },
    rfid: {
        type: String,
        ref: 'Space',
        required: 'You must supply a space'
    }
});


module.exports = mongoose.model('Car', carSchema);