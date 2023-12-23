//  require modules
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const constant = require('./constants/constant')
const blogRoute = require('./routes/blogRoute')
const userRoute = require('./routes/userRoute')
const errorHandler = require("./middlewares/errorHandlerMiddleware")
const ejs = require('ejs')
const PORT = process.env.PORT || 5000

const app = express()


app.set('view engine', 'ejs')
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))


//  connect to db
mongoose.connect(process.env.DB_CONNECTION_STRING)


//  middlewares
app.use('/api/blogs', blogRoute)
app.use('/api/users', userRoute)
app.use(errorHandler)

app.listen(PORT, (req, res) => {
    console.log(`server started at port ${PORT}`)
})