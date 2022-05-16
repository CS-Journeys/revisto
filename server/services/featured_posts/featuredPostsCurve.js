/**
 * This file involves math yay woohoo!
 * Talk to Daniel Luper if you have questions.
 */

const MIN_SELECT_FROM = 5;    // b
const MID_SELECT_FROM = 20;   // d
const NUM_FEATURED = 20;      // f
const MID_FEATURED_INDEX = 6  // c

/**
 *
 *              ^
 *              |
 *    total num x - - - - - - - - - - - - - - - - - - - - - - - - - x (e,f)
 *        posts |                                                   |
 *              |                                                  /  
 *              |                                                  ||
 *              |                                                 / 
 *              |                                                /  |
 *              |                                              _/
 *  num posts   |                                          ___/     |
 * back in time |                    (c,d)          ______/ 
 *  to select   |               _________x_________/                |
 *    from      |        ______/
 *              |    __/                 |                          |
 *              |   / 
 *        (a,b) | /                      |                          |
 *              x           y1                        y2
 *              |                        |                          |
 *              |
 *              +---------------------------------------------------x------------------->
 *                                                                    total num 
 *                                    featured post index             featured posts
 * 
 *     / y1 = {(b-d)(x-c)^2} / {c^2} + d
 * y = |
 *     \ y2 = {(f-d)(x-c)^2} / {(e-c)^2} + d
 */

export const getNumFeaturedPosts = () => {
  return NUM_FEATURED;
}

/**
 * Computes n -- the number of most recent posts to select from
 * for the given featured post.
 * 
 * @param x the index of the given featured post
 * @returns the number of posts to select from
 */
export const getSelectionWindow = (x, numPosts) => {
  // Data abstraction
  let n;            
  let a = 0;
  let b = MIN_SELECT_FROM;
  let c = MID_FEATURED_INDEX;
  let d = MID_SELECT_FROM;
  let e = NUM_FEATURED;
  let f = numPosts;

  // Error handling
  if (x < a || x >= f) {
    throw new RangeError();
  }

  // Plug n chug
  if (x <= c) {     // y1
    n = (b-d) * (x-c) * (x-c) / (c*c) + d;
  } else {          // y2
    n = (f-d) * (x-c) * (x-c) / ((e-c) * (e-c)) + d
  }

  return Math.round(n);
}