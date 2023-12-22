
const getAllBlogs = (req, res, next) => {
    console.log('get all blogs')
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