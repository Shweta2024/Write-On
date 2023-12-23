const User = require('../models/userModel')
const bcrypt = require('bcrypt')

const loginUser = (req, res, next) => {
    console.log('logged in')
}

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            res.status(400)
            throw new Error('All fields are required!')
        }

        // check if email already exists
        const userExists = await User.findOne({ email: email })
        if (userExists) {
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

        res.status(200).json({name, email})
    } catch (err) {
        next(err)
    }
}

module.exports = {
    loginUser,
    registerUser
}
