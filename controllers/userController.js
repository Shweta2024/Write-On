const User = require('../models/userModel')
const Message = require('../models/messageModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// function to check if user exists
const userExists = async (email) => {
    const user = await User.findOne({ email: email })
    console.log(user)
    return user
}


// @desc Render login form
// @route /api/users/login
// @access public
const getLoginUserForm = (req, res) => {
    res.status(200).render('login')
}


// @desc Login user
// @route /api/users/login
// @access public
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400)
            throw new Error('All fields are required!')
        }

        const user = await userExists(email)
        if (!user) {
            res.status(404)
            throw new Error(`No user found with email ${email}`)
        }

        console.log(password, user.password)
        const isMatched = await bcrypt.compare(password, user.password)

        if (!isMatched) {
            res.status(400)
            throw new Error('Password is incorrect!')
        }

        const accessToken = jwt.sign({
            payload: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        }, process.env.JWT_SECRET,
            {
                expiresIn:"7d"
        })
        
        res.cookie('auth-token', accessToken)
        console.log(accessToken)
        // res.status(200).json(accessToken)
        res.status(200).redirect('/api/blogs/allBlogs')
    } catch (err) {
        next(err)
    }
}


// @desc Render register form
// @route /api/users/register
// @access public
const getRegisterUserForm = (req, res) => {
    res.status(200).render('register')
}


// @desc Register a user
// @route /api/users/register
// @access public
const registerUser = async (req, res, next) => {
    try {
        console.log(req.body)
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            res.status(400)
            throw new Error('All fields are required!')
        }

        // check if email already exists
        if (await userExists(email)) {
            res.status(400)
            throw new Error(`User with email ${email} already exists!`)
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            email,
            password: hashedPassword
        })
        await user.save()

        console.log(user)
        res.status(200).redirect('/api/users/login')
    } catch (err) {
        next(err)
    }
}


// @desc Logout user
// @route /api/users/logout
// @access public
const logOutUser = (req, res, next) => {
    res.clearCookie('auth-token')
    res.redirect('/api/users/login')
}


// @desc Render contact us form
// @route /api/users/contact
// @access private
const getContactUsForm = (req, res, next) => {
    res.status(200).render('contact')
}


// @desc Get the message from user
// @route /api/users/contact
// @access private
const contactUs = (req, res, next) => {
    const { name, email, message } = req.body
    console.log(req.body)
    const messageObject = new Message({
        userID: req.user.payload._id,
        name,
        email,
        message
    })
    messageObject.save()

    res.status(200).redirect('/api/blogs/allBlogs')
}


module.exports = {
    getLoginUserForm,
    loginUser,
    getRegisterUserForm,
    registerUser,
    logOutUser,
    getContactUsForm,
    contactUs
}
