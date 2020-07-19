const mongoose = require('mongoose')

const LogSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    attention: {
        type: Boolean, 
        required: true
    },
    tech: {
        type: String, 
        required: true,
    },
    date: {
        type: Date, 
        required: true
    }
});

module.exports = mongoose.model('log', LogSchema)