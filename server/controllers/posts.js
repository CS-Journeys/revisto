import Post from '../models/Post.js';

export const getPosts = (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      res.send(err);
    }
    res.json(posts);
  });
}

export const getPost = (req, res) => {
  //using req.params.id
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      res.send(err);
    }
    res.json(post);
  });
}

export const createPost = (req, res) => {
  //req.body has user, title, and content
  //create a new post with the request body
 
  let newPost = new Post(req.body);

  console.log(req.body);

  console.log(newPost);
  newPost.save((err, post) => {
    if (err) {
      res.send(err);
    }
    res.json(post);
  });
}

export const getUserPosts = (req, res) => {
  //Gets all posts by a specific user
  console.log("We got here");
  console.log(req.token.userId);
  Post.find({ user: req.token.userId }, (err, posts) => {
    if (err) {
      res.send(err);
    }
    res.json(posts);
  });
}

export const deletePost = (req, res) => {
  Post.remove({ _id: req.params.id }, (err, post) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Successfully deleted post!' });
  });
}