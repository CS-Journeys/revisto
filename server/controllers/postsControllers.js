import Post from "../models/postModel.js";
import User from "../models/userModel.js";

// Gets all posts
var mySort = {dateCreated : -1};
export const getPosts = (req, res) => {
  const before = new Date(req.query.before);
  const query = req.query.before ? { "dateCreated": { "$lt": before } } : {};
  Post.find(query, 'title content dateCreated').sort(mySort).limit(20).select().exec((err, posts) => {
    if (err) {
      return res.json({ err: "ERROR" });
    }
    res.json({ posts });
  });
};

// Gets post by id (uses req.params.id)
export const getPost = (req, res) => {
  Post.findById(req.params.id, "title content dateCreated", (err, post) => {
    if (err) {
      return res.json({ err: "NOTAPOST" });
    }
    res.json({ post });
  });
};

// Gets all of cur user's posts
export const getUserPosts = (req, res) => {
  Post.find(
    { user: req.user._id },
    "title content dateCreated",
    (err, posts) => {
      if (err) {
        return res.json({ err: "ERROR" });
      }
      res.json({ posts });
    }
  );
};

// Creates a new post with the request body
// req.body has title and content
export const createPost = (req, res) => {
  
  // Check if it's been a day since the last post by checking User.lastPost
  if (req.user.lastPost) {
    let lastPost = new Date(req.user.lastPost);
    let now = new Date();
    let diff = now - lastPost;
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    if (diffDays < 1) {
      return res.json({ err: "TOOFAST" });
    }
  };
  
  let newPost = new Post(req.body);
  newPost.user = req.user._id;
  newPost.save((err, post) => {
    if (err) {
      return res.json({ err: "ERROR" });
    }
    res.json({ status: "Success", id: post._id });
  });
};

// Deletes the post of the given id (uses req.params.id)
export const deletePost = (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      return res.json({ err: "BADQUERY" });
    }
    if (!post) {
      return res.json({ err:"NOTAPOST"});
    }
    if (post.user != req.token.userId) {
      return res.json({ err: "NOTAUTHOR" });
    }
    post.remove((err, post) => {
      if (err) {
        return res.json({ err: "ERROR" });
      }
      res.json({ status: "Success" });
    });
  });
};

export const updatePost = (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      return res.json({ err: "BADQUERY" });
    }
    if (!post) {
      return res.json({ err: "NOTAPOST" });
    }
    if (post.user != req.token.userId) {
      return res.json({ err: "NOTAUTHOR" });
    }
    if (req.body.title) { post.title = req.body.title; }
    if (req.body.content) { post.content = req.body.content; }
    post.save((err, newpost) => {
      if (err) {
        return res.json({ err: "ERROR" });
      }
      res.json({ status: "Success" });
    });
  });
}

export const reportPost = (req, res) => {
  const query = {
    $inc: { reportCount: 1 },
    $push: req.body.reason ? { reports: req.body.reason } : {reports:"No Comment"},
  };
  console.log(query);
  Post.findByIdAndUpdate(req.params.id, query, (err, post) => { 
    if (err) {
      res.json({ err: "ERROR" });
    }
    res.json({ status: "Success" });
  });
}