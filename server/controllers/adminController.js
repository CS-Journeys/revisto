import Post from "../models/postModel.js";

export const getPost = async (req, res) => {
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

export const getReportedPosts = async (req, res) => {
  //Get posts where reportCount > 0 and sort by reportCount from highest to lowest
  Post.find({ reportCount: { $gt: 0 } }).sort({ reportCount: -1 }).exec((err, posts) => {
    if (err) {
      return res.json({ err: "ERROR" });
    }
    res.json({ posts });
  });
}