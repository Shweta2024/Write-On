//require modules
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const constant = require('./constants/constant')

const blogRoute = require('./routes/blogRoute')
const userRoute = require('./routes/userRoute')

const errorHandler = require("./middlewares/errorHandlerMiddleware");

const app = express();
app.use(express.json())
mongoose.connect(process.env.DB_CONNECTION_STRING)



app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.use('/api/blogs', blogRoute)
app.use('/api/users', userRoute)
app.use(errorHandler)

app.get("/", function (req, res) {
  Blog.find({}, function (err, result) {
    if (!err)
      res.render("home", { para: constant.homeStartingContent, posts: result });
  });
});

app.get("/about", function (req, res) {
  res.render("about", { para: constant.aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { para: constant.contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

//save the new post 
//& redirect to the home page only when the current post gets saved
app.post("/compose", function (req, res) {
  const blog = new Blog({
    postTitle: req.body.postTitle,
    postBody: req.body.postBody
  });

  blog.save(function (err) {
    if(!err)
      res.redirect("/");
  });
});

//save the message & redirect to home page
app.post("/contact", function (req, res) {
  const message = new Message({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });

  message.save(function (err) {
    if (!err)
      res.redirect("/");
  });
});

//find & open a post
app.get("/posts/:postId", function (req, res) {
  const postId = req.params.postId;
  Blog.findOne({ _id: postId }, function (err, result) {
    if (!err)
      res.render("post", { title: result.postTitle, post: result.postBody });
  });
});

//delete a post
app.post("/post", function (req, res) {
  Blog.deleteOne({ postTitle: req.body.deletePost }, function (err, result) {
    if (!err)
      res.redirect("/");
  });
});

app.listen(PORT, function (req, res) {
  console.log("server started at port : 5000");
});

