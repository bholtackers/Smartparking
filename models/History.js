const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const historySchema = new mongoose.Schema({
    Entry: {
        type: String,
        required: true,
    },
    Exit: {
        type: String,
        default: Date.now,
        required: true,
    },
    Duration: {
        type: String,
        required: true,
    },
    Price: {
        type: String,
        required: true,
    },
    PricePerHour: {
        type: Number,
        required: true,
    },
    Numberplate: {
        type: String,
        required: true,
    },
});


module.exports = mongoose.model('History', historySchema);
