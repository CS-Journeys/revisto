import { FEATURED_POSTS_UPDATE_INTERVAL } from "../../constants.js";
import logger from "../../core/utils/logger.js";
import { updateFeaturedPosts } from "./featuredPosts.js";

const INTERVAL = FEATURED_POSTS_UPDATE_INTERVAL * 60 * 1000;

export const startFeaturedPostsUpdateJob = () => {
  updateFeaturedPosts();
  setInterval(() => {updateFeaturedPosts()}, INTERVAL);
  logger.info("Started FeaturedPosts auto-update job");
}