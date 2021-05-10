//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-hibu:hibu123@cluster0.qzwgr.mongodb.net/blogsDB", {useNewUrlParser: true, useUnifiedTopology: true});

const postSchema = {
  title: String,
  text: String
}

const Posts = mongoose.model("Posts", postSchema);

app.get("/", function(req, res) {
  res.render("login");
})
app.post("/", function(req, res) {
  res.redirect("/home");
})
app.get("/home", function(req, res) {
  Posts.find({}, function(err, foundList) {
    if (foundList) {
        res.render("home", {startingContent:homeStartingContent, secondContent:foundList});
    }
    else {
      res.render("home");
    }
  })

});

app.get("/posts/:id", function(req, res) {
    const id = req.params.id;
    console.log(req.params.id);
   Posts.findOne({_id: id}, function(err, foundList) {
     if(!err) {
       res.render("post", {postTitle: foundList.title, postContent: foundList.text});
     }
   })

  // var requested = _.lowerCase(req.params.id);
  // posts.forEach(function(post) {
  //   var stored = _.lowerCase(post.title);
  //   if (stored === requested) {
  //     res.render("post", {postTitle:post.title, postContent:post.text});
  //   }
  });

// app.post("/posts/:id", function(req, res) {
//   const house = req.body.home;
//   console.log(req.body.home);
//   if(house === "home") {
//     res.redirect("/");
//   }
//
// });

app.get("/about", function(req, res){
  res.render("about", {about:aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contact:contactContent})
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const title = req.body.text;
  const content = req.body.postBody;
  const post1 = new Posts ({
    title: title,
    text: content
  });
  post1.save();
  res.redirect("/home");
});




app.listen(process.env.port, function() {
  console.log("Server started on port 3000");
});
