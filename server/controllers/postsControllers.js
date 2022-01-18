import Post from "../models/postModel.js";

const REVERSE_DATE_SORT = {dateCreated : -1};

// Gets all posts
export const getPosts = async (req, res) => {
  const before = new Date(req.query.before);
  const query = req.query.before ? { "dateCreated": { "$lt": before } } : {};
  Post.find(query, 'title content dateCreated').sort(REVERSE_DATE_SORT).limit(20).select().exec((err, posts) => {
    if (err) {
      return res.json({ err: "ERROR" });
    }
    res.json({ posts });
  });
}

// Gets post by id (uses req.params.id)
export const getPost = async (req, res) => {
  Post.findById(req.params.id, "title content dateCreated user", (err, post) => {
    if (err) {
      return res.json({ err: "NOTAPOST" });
    }
    let modPost = post.toObject();
    if (post.user.equals(req.user._id)) {
      modPost.isMine = true;
    }
    delete modPost.user;
    res.json({ post:modPost });
  });
}

// Gets all of cur user's posts
export const getUserPosts = async (req, res) => {
  Post.find({ user: req.user._id }, "title content dateCreated").sort(REVERSE_DATE_SORT).exec((err, posts) => {
    if (err) {
      return res.json({ err: "ERROR" });
    }
    res.json({ posts });
  });
}

// Creates a new post with the request body
// req.body has title and content
export const createPost = async (req, res) => {
  
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
}

export const deletePost = async (req, res) => {
  Post.findById(req.params.id, async (err, post) => {
    if (err) {
      return res.json({ err: "BADQUERY" });
    }
    if (!post) {
      return res.json({ err: "NOTAPOST" });
    }
    if (req.ifOwn && post.user.toString() != req.user._id) {
      return res.json({ err: "FORBIDDEN" });
    }
    await Post.deleteOne({ _id: post._id });
    res.json({ status: "Success" });
  });
}

export const updatePost = async (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      return res.json({ err: "BADQUERY" });
    }
    if (!post) {
      return res.json({ err: "NOTAPOST" });
    }
    if (req.ifOwn && post.user.toString() != req.user._id) {
      return res.json({ err: "FORBIDDEN" });
    }
    if (req.body.title) { post.title = req.body.title; }
    if (req.body.content) { post.content = req.body.content; }
    post.save((err) => {
      if (err) {
        return res.json({ err: "ERROR" });
      }
      return res.json({ status: "Success" });
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