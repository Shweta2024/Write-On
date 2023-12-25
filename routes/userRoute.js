const router = require('express').Router()
const {
    getLoginUserForm,
    loginUser,
    getRegisterUserForm,
    registerUser
} = require('../controllers/userController')


router.get('/login', getLoginUserForm)

router.post('/login', loginUser)

router.get('/register', getRegisterUserForm)

router.post('/register', registerUser)


module.exports = router