import Post from "../models/postModel.js";

export const getPost = (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      return res.json({ err: "BADQUERY" });
    }
    if (!post) {
      return res.json({ err: "NOTAPOST" });
    }
    res.json({post});
  });
};

export const getReportedPosts = (req, res) => {
  //Get posts where reportCount > 0 and sort by reportCount from highest to lowest
  Post.find({ reportCount: { $gt: 0 } }).sort({ reportCount: -1 }).exec((err, posts) => {
    if (err) {
      return res.json({ err: "ERROR" });
    }
    res.json({ posts });
  });
}

export const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id, (err, post) => {
    if (err) {
      return res.json({ err: "BADQUERY" });
    }
    if (!post) {
      return res.json({ err: "NOTAPOST" });
    }
    res.json({status: "Success"});
  });
};