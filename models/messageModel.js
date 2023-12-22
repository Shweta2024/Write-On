const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, ' Please enter your name.']
    },
    email: {
        type: String,
        required: [true, ' Please enter your email.']
    },
    message: {
        type: String,
        required: [true, ' Please enter a message.']
    }
});

module.exports = mongoose.model("Message", messageSchema);