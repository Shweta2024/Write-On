const jwt = require('jsonwebtoken')


//  middleware to validate the access token
const validateUserMiddleware = (req, res, next) => {
    console.log('validating token')
    const accessToken = req.cookies['auth-token']
    console.log('access token: ', accessToken)
    
    try {
        if (!accessToken) {
            res.status(401)
            throw new Error('Access Denied, no access token was provided!')
        }
        const verifiedUser = jwt.verify(accessToken, process.env.JWT_SECRET)
        req.user = verifiedUser
        console.log(verifiedUser.payload)
        next()
    } catch (err) {
        res.status(401)
        err.message = "Invalid access token"
        next(err)
    }
}


module.exports = validateUserMiddleware