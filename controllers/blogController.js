const Blog = require('../models/blogModel')
const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId


// @desc Get All Blogs
// @route /api/blogs/allBlogs
// @access private
const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find()
        res.status(200).render('allBlogs', { message: `Hey ${req.user.payload.name}, explore all blogs!`, blogs: blogs })
    } catch (err) {
        next(err)
    }
}


// @desc Get a Blog
// @route /api/blogs/read/:id
// @access private
const getBlog = async (req, res, next) => {
    try {
        const blogID = req.params.id
        console.log(blogID)
        if (!objectId.isValid(blogID)) {
            console.log('got invalid id')
            res.status(400)
            throw new Error(`${blogID} is an invalid blog Id`)
        }

        const blog = await Blog.findOne({_id: blogID})

        if (!blog) {
            res.status(404)
            throw new Error(`No blog found with id ${blogID}`)
        }

        let blogOwnerID = blog.userID.toString()
        let isOwner = false
        if (blogOwnerID === req.user.payload._id) {
            isOwner = true
        }

        res.status(200).render('blog', {isOwner, blog: blog})
    } catch (err) {
        next(err)
    }
}


// @desc Render create blog form
// @route /api/blogs/create
// @access private
const getCreateBlogForm = (req, res, next) => {
    res.status(200).render('createBlog')
}


// @desc Create a Blog
// @route /api/blogs/create
// @access private
const createBlog = async (req, res, next) => {
    try {
        const { blogTitle, blogBody } = req.body 
        
        if (!blogTitle || !blogBody) {
            res.status(400)
            throw new Error('All Feilds are required!')
        }

        const blog = new Blog({
            userID: req.user.payload._id,
            blogTitle,
            blogBody
        })
        await blog.save()

        res.status(200).redirect('/api/blogs/myBlogs')
    } catch (err) {
        next(err)
    }
}


// @desc Update a Blog
// @route /api/blogs/read/:id
// @access private
const updateBlog = async (req, res, next) => {
    try {
        const blogID = req.params.id
        console.log(blogID)
        if (!objectId.isValid(blogID)) {
            console.log('got invalid id')
            res.status(400)
            throw new Error(`${blogID} is an invalid blog Id`)
        }

        console.log(req.body)
        const updatedBlog = await Blog.findOneAndUpdate(
            {_id: blogID},
            req.body,
            {new: true}
        )

        if (!updatedBlog) {
            res.status(404)
            throw new Error(`No blog found with id ${blogID}`)
        }

        res.status(200).send({'message': 'Blog updated successfully'})
    } catch (err) {
        next(err)
    }
}


// @desc Delete a Blog
// @route /api/blogs/delete/:id
// @access private
const deleteBlog = async (req, res, next) => {
    try {
        const blogID = req.params.id
        console.log(blogID)
        if (!objectId.isValid(blogID)) {
            res.status(400)
            throw new Error(`${blogID} is an invalid blog Id`)
        }

        const result = await Blog.deleteOne({ _id: blogID })
        console.log(result) // { acknowledged: true, deletedCount: 1 }
        if (!result.deletedCount) {
            res.status(404)
            throw new Error(`No blog found with id ${blogID}`)
        }
        res.status(200).send({'message': 'Blog deleted successfully'})
    } catch (err) {
        next(err)
    }
}


// @desc Get blog of currently authorized user
// @route /api/blogs/myBlogs
// @access private
const getMyBlogs = async (req, res, next) => {
    try {
        const myBlogs = await Blog.find({userID: req.user.payload._id}) // req.user._id -> id of the current authorized user
        res.status(200).render('allBlogs', {message: `Hey ${req.user.payload.name}, explore your blogs!`, blogs: myBlogs })
    } catch (err) {
        next(err)
    }
}


module.exports = {
    getAllBlogs,
    getBlog,
    getCreateBlogForm,
    createBlog,
    updateBlog,
    deleteBlog,
    getMyBlogs
}