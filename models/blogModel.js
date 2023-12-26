const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // reference of the user model
    },
    blogTitle: {
        type: String,
        required: [true, 'Please enter a title.']
    },
    blogBody: {
        type: String,
        required: [true, 'Please write content of the blog.']
    }
}, {
    timestamps: true
});


module.exports = mongoose.model("Blog", blogSchema);
