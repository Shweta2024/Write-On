const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
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
