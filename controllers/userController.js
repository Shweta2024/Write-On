const User = require('../models/userModel')
const bcrypt = require('bcrypt')


// function to check if user exists
const userExists = async (email) => {
    const user = await User.findOne({ email: email })
    console.log(user)
    return user
}

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

        res.status(200).json(user.name)
    } catch (err) {
        next(err)
    }
}

const registerUser = async (req, res, next) => {
    try {
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

        res.status(200).json({name, email})
    } catch (err) {
        next(err)
    }
}

module.exports = {
    loginUser,
    registerUser
}
