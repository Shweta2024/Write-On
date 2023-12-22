const Blog = require('../models/blogModel')


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