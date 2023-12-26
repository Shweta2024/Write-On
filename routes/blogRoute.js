const router = require('express').Router()
const {
    getAllBlogs,
    getBlog,
    getCreateBlogForm,
    createBlog,
    updateBlog,
    deleteBlog,
    getMyBlogs
} = require('../controllers/blogController')
const validateUserMiddleware = require('../middlewares/validateUserMiddleware')


//  allow only authorized users to access the routes
router.use(validateUserMiddleware)

router.get('/allBlogs', getAllBlogs)

router.get('/read/:id', getBlog)

router.get('/create', getCreateBlogForm)

router.post('/create', createBlog)

router.put('/read/:id', updateBlog)

router.delete('/delete/:id', deleteBlog)

router.get('/myBlogs', getMyBlogs)


module.exports = router