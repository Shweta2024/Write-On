const loginUser = (req, res, next) => {
    console.log('logged in')
}

const registerUser = (req, res, next) => {
    console.log('registered user')
}

module.exports = {
    loginUser,
    registerUser
}
