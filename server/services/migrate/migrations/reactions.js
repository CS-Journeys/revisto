import Post from "../../../core/models/postModel.js";

export const addReactions = async (req, res) => {
  await Post.updateMany(
    {},
    {
      reactions: {},
    }
  ).exec();

  res.end();
};

export const removeReactions = async (req, res) => {
  Post.updateMany(
    {},
    {
      $unset: {
        reactedUsers: 1,
        reactionCount: 1,
      },
    }
  ).exec();

  res.end();
};

export const removeReactedUsers = async (req, res) => {
  Post.updateMany(
    {},
    {
      $unset: {
        reactedUsers: 1,
      },
    }
  ).exec();

  res.end();
};

export const clearReactions = async (req, res) => {
  Post.updateMany(
    {},
    {
      reactions: {},
      reactionCount: 0,
    }
  );
  res.end();
};

export const updateReactionCount = async (req, res) => {
  const posts = await Post.find({}).exec();

  for (const post of posts) {
    if (post.reactionCount != post.reactions.size) {
      console.log(post);
      post.reactionCount = post.reactions.size;
      await post.save();
    }
  }
  res.end();
};
