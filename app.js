//require modules
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

const homeStartingContent = "Discover the power of words and the magic of storytelling with Write On!";
const aboutContent = "Where creativity and connection meet. Welcome to Write On!";
const contactContent = "Connect with us and let's make something great together.";

const app = express();

//connect mongoose, create schema & collection
mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://admin-shweta:"+process.env.PASSWORD+"@cluster0.vtowurn.mongodb.net/BlogDB");

const blogSchema = mongoose.Schema({
  postTitle: String,
  postBody: String
});

const messageSchema = mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Blog = mongoose.model("blog", blogSchema);
const Message = mongoose.model("message", messageSchema);

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  Blog.find({}, function (err, result) {
    if (!err)
      res.render("home", { para: homeStartingContent, posts: result });
  });
});

app.get("/about", function (req, res) {
  res.render("about", { para: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { para: contactContent });
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

