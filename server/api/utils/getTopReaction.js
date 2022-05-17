import logger from "../../core/utils/logger.js";

/**
 * @param post a basic javascript object
 */
export default (post) => {
  if (!post.reactions) return undefined;
  let reactionsSum = {};

  // Summate
  for (const reaction of post.reactions.values()) {
    reactionsSum[reaction] = reactionsSum[reaction] + 1 || 1;
  }

  // Pick top reaction
  let maxCount = 0;
  let topReaction;
  for (const reaction in reactionsSum) {
    const curCount = reactionsSum[reaction];
    logger.debug(`${reaction}: ${curCount}`);
    if (curCount > maxCount) {
      maxCount = curCount;
      topReaction = reaction;
    }
  }

  return topReaction;
}