import Post from "../../../core/models/postModel.js";

export const addReactions = async (req, res) => {
  await Post.updateMany({reactionCount: undefined}, {
    reactedUsers: [],
    reactionCount: 0 
  }).exec();

  res.end();
}

export const removeReactions = async (req, res) => {
  Post.updateMany({}, {$unset : {
    reactedUsers: 1,
    reactionCount: 1
  }}).exec();

  res.end();
}