const mongoose = require('mongoose');

const user = new mongoose.Schema({
    user_id: {
        type: String,
        require: true
    },
    user_first_name: {
        type: String,
        required: true,
    },
    user_last_name: {
        type: String,
        required: true,
    },
    user_email: {
        type: String,
        required: true,
    },
    user_password: {
        type: String,
        required: true
    },
    user_status: {
        type: Number,
        required: true
    },
    user_token: {
        type: String,
        required: true
    },
    user_timestamp: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('user', user);