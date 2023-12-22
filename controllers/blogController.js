const Blog = require('../models/blogModel')

const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find()
        res.status(200).json(blogs)
    } catch (err) {
        next(err)
    }
}

const getBlog = (req, res, next) => {
    console.log(`get a blog with id: ${req.params.id}`)
}

const createBlog = (req, res, next) => {
    console.log('create a blog')
}

const updateBlog = (req, res, next) => {
    console.log(`update a blog with id: ${req.params.id}`)
}

const deleteBlog = (req, res, next) => {
    console.log(`delete a blog with id: ${req.params.id}`)
}

module.exports = {
    getAllBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
}