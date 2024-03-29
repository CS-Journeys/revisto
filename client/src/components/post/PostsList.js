import React from "react";
import Post from "./Post";

/**
 * Component to get the posts to be displayed.
 *
 * @param {Function} postFunc The function to get the posts (usePosts())
 * @returns {JSX.Element} The posts to be displayed
 */
const PostsList = ({ posts }) => {
  const { posts: postArray, loadMoreRef, hasMore, isLoading } = posts;

  return (
    <>
      <div className="row d-flex justify-content-center">
        {postArray &&
          postArray.map((post,ndx) => <Post key={post._id+ndx} post={post} />)}
      </div>
      {hasMore && !isLoading ? (
        <p className="text-center" ref={loadMoreRef}>Loading More...</p>
      ) :
        <p className="text-center"></p>
      }
      </>
  );
};

export default PostsList;
