const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: [true, 'Username field is required']
    },
    password: {
        type: String,
        required: [true, 'Password field is required']
    },
});

module.exports = mongoose.model('auth', authSchema);
