const Blog = require('../models/blogModel')
const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId

// @desc Get All Blogs
// @route /api/blogs
// @access public
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


// @desc Create a Blog
// @route /api/blogs
// @access public
const createBlog = async (req, res, next) => {
    try {
        const { blogTitle, blogBody } = req.body 
        
        if (!blogTitle || !blogBody) {
            res.status(400)
            throw new Error('All Feilds are required!')
        }

        const blog = new Blog({
            blogTitle,
            blogBody
        })
        await blog.save()

        res.status(200).json(blog)
    } catch (err) {
        next(err)
    }
}


// @desc Update a Blog
// @route /api/blogs/:id
// @access public
const updateBlog = async (req, res, next) => {
    console.log('updateBlog')
    try {
        const blogID = req.params.id
        console.log(blogID)
        if (!objectId.isValid(blogID)) {
            console.log('got invalid id')
            res.status(400)
            throw new Error(`${blogID} is an invalid blog Id`)
        }

        const updatedBlog = await Blog.findOneAndUpdate(
            {_id: blogID},
            req.body,
            {new: true}
        )

        if (!updatedBlog) {
            res.status(404)
            throw new Error(`No blog found with id ${blogID}`)
        }

        res.status(200).json(updatedBlog)
    } catch (err) {
        next(err)
    }
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