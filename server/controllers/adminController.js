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