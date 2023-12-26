const router = require('express').Router()
const {
    getLoginUserForm,
    loginUser,
    getRegisterUserForm,
    registerUser,
    logOutUser
} = require('../controllers/userController')


router.get('/login', getLoginUserForm)

router.post('/login', loginUser)

router.get('/register', getRegisterUserForm)

router.post('/register', registerUser)

router.get('/logout', logOutUser)


module.exports = router