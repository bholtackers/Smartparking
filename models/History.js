const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const historySchema = new mongoose.Schema({
    Entry: {
        type: Date,
        required: true,
    },
    Exit: {
        type: Date,
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
    numberplate: {
        type: String,
        required: true,
    },
    ownerId: {
        type: String,
        required: true,
    }
});


module.exports = mongoose.model('History', historySchema);