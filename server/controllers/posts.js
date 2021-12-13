import Post from "../models/postModel.js";

// Gets all posts
export const getPosts = (req, res) => {
  Post.find({}, "title content dateCreated", (err, posts) => {
    if (err) {
      res.json({ err: "ERROR" });
    }
    res.json({ posts });
  });
};

// Gets post by id (uses req.params.id)
export const getPost = (req, res) => {
  Post.findById(req.params.id, "title content dateCreated", (err, post) => {
    if (err) {
      res.json({ err: "NOPOST" });
    }
    res.json({ post });
  });
};

// Gets all posts by a specific user
export const getUserPosts = (req, res) => {
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

// Creates a new post with the request body
// req.body has user, title, and content
export const createPost = (req, res) => {
  let newPost = new Post(req.body);
  newPost.user = req.token.userId;

  newPost.save((err, post) => {
    if (err) {
      res.json({ err: "ERROR" });
    }
    res.json({ status: "Success" });
  });
};

// Deletes the post of the given id (uses req.params.id)
export const deletePost = (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      res.json({ err: "NOTAPOST" });
    }
    if (post.user != req.token.userId) {
      res.json({ err: "NOTAUTHOR" });
    }
    post.remove((err, post) => {
      if (err) {
        res.json({ err: "ERROR" });
      }
      res.json({ status: "Success" });
    });
  });
};

export const updatePost = (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      return res.json({ err: "NOTAPOST" });
    }
    console.log(post.user);
    console.log(req.token.userId);
    if (post.user != req.token.userId) {
      return res.json({ err: "NOTAUTHOR" });
    }
    post.save((err, post) => {
      if (err) {
        return res.json({ err: "ERROR" });
      }
      res.json({ post:{title:post.title,content:post.content} });
    });
  });
}
