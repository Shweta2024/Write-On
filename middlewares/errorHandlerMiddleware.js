const constantStatus = require('../constants/constantStatus')

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500
    console.log(statusCode)

    switch (statusCode) {
        case constantStatus.VALIDATION_ERROR:
            res.json({
                title: 'VALIDATION_ERROR',
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case constantStatus.UNAUTHORIZED:
            // res.json({
            //     title: 'UNAUTHORIZED ',
            //     message: err.message,
            //     stackTrace: err.stack
            // })
            res.redirect('/api/users/login')
            break;
        case constantStatus.FORBIDDEN:
            res.json({
                title: 'FORBIDDEN ',
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case constantStatus.NOT_FOUND:
            res.json({
                title: 'NOT_FOUND ',
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case constantStatus.SERVER_ERROR:
            res.json({
                title: 'SERVER_ERROR ',
                message: err.message,
                stackTrace: err.stack
            })
            break;
        default:
            next()
            break;
    }
}

module.exports = errorHandler