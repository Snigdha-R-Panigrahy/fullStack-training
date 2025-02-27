const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    age: {
        type: Number
    },
});

const userModel = mongoose.model('Users', userSchema);
module.exports = userModel;