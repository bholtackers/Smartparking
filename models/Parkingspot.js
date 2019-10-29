const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const parkingspotSchema = new mongoose.Schema({
    numberplate: {
        type: String,
        required: 'You must supply a numberplate'
    },
    spot: {
        type: String,
        required: 'You must supply a spot'
    },
    price: {
        type: Number,
        required: 'You must supply a price'
    }
});


module.exports = mongoose.model('Parkingspot', parkingspotSchema);
