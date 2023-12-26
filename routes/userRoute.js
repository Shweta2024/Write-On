const router = require('express').Router()
const {
    getLoginUserForm,
    loginUser,
    getRegisterUserForm,
    registerUser,
    logOutUser,
    getContactUsForm,
    contactUs
} = require('../controllers/userController')
const validateUserMiddleware = require('../middlewares/validateUserMiddleware')


router.get('/login', getLoginUserForm)

router.post('/login', loginUser)

router.get('/register', getRegisterUserForm)

router.post('/register', registerUser)

router.get('/logout', logOutUser)

router.get('/contact', validateUserMiddleware, getContactUsForm)

router.post('/contact', validateUserMiddleware, contactUs)


module.exports = router