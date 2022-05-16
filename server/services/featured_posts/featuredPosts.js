import Post from "../../core/models/postModel.js";
import { getNumFeaturedPosts, getSelectionWindow } from "./featuredPostsCurve.js";
import logger from "../../core/utils/logger.js";

const TOP_REACTION_SORT = { reactionCount: -1 };
const EARLIEST_DATE_SORT = { dateCreated: -1 };

class FeaturedPosts {
  static posts = []

  static getPosts = () => {
    return this.posts;
  }

  static updatePosts = async () => {
    const responseFields = "title content dateCreated reactionCount";
    const numFeatured = getNumFeaturedPosts();
    let featured = [];
    const numPosts = await Post.countDocuments().exec();
    let repeatCount = 0;

    logger.info("There are " + numPosts + " posts");

    for (let i = 0; i < numFeatured; i++) {
      const n = getSelectionWindow(i, numPosts);
      let curFeatured;
      logger.debug("For featured post #" + i + ", selecting top reacted post from the last " + n + " posts");

      for (let j = 0; j <= repeatCount; j++) {
        curFeatured = await Post.find()
          .sort(EARLIEST_DATE_SORT)
          .limit(n)
          .where('_id').nin(featured.map(post => post._id))
          .exec();
        curFeatured = await Post.find({}, responseFields)
          .where('_id').in(curFeatured.map(post => post._id))
          .sort(TOP_REACTION_SORT)
          .limit(1)
          .exec();
        if (curFeatured.length > 0) {
          featured.push(curFeatured[0]);
          repeatCount = 0;
        }
      }

      if (curFeatured.length == 0) {
        logger.debug("Could not find top reacted from last " + n + " posts");
        repeatCount++;
      }
    }

    logger.info("Recommended " + featured.length + " featured posts");

    this.posts = featured;
  }
}

export const updateFeaturedPosts = () => {
  FeaturedPosts.updatePosts();
}

export const getFeaturedPosts = () => {
  return FeaturedPosts.getPosts();
}
