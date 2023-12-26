const router = require('express').Router()
const {
    getAllBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blogController')
const validateUserMiddleware = require('../middlewares/validateUserMiddleware')


//  allow only authorized users to access the routes
router.use(validateUserMiddleware)

router.get('/', getAllBlogs)

router.get('/:id', getBlog)

router.post('/', createBlog)

router.put('/:id', updateBlog)

router.delete('/:id', deleteBlog)


module.exports = router