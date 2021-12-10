import Post from "../models/Post.js";

export const getPosts = (req, res) => {
  Post.find({}, "title content dateCreated", (err, posts) => {
    if (err) {
      res.json({ err: "ERROR" });
    }
    res.json({posts});
  });
};

export const getPost = (req, res) => {
  //using req.params.id
  Post.findById(req.params.id, "title content dateCreated", (err, post) => {
    if (err) {
      res.json({ err: "NOPOST" });
    }
    res.json({post});
  });
};

export const createPost = (req, res) => {
  //req.body has user, title, and content
  //create a new post with the request body

  let newPost = new Post(req.body);
  newPost.user = req.token.userId;

  console.log(newPost);
  newPost.save((err, post) => {
    if (err) {
      res.json({ err: "BADPOST" });
    }
    res.json({post});
  });
};

export const getUserPosts = (req, res) => {
  //Gets all posts by a specific user
  Post.find(
    { user: req.token.userId },
    "title content dateCreated",
    (err, posts) => {
      if (err) {
        res.json({ err: "ERROR" });
      }
      res.json({ posts });
    }
  );
};

export const deletePost = (req, res) => {
  Post.remove({ _id: req.params.id }, (err, post) => {
    if (err) {
      res.json({ err: "ERROR" });
    }
    res.json({ message: "Successfully deleted post!" });
  });
};
