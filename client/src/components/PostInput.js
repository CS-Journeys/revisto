import React from "react";
import { Link } from "react-router-dom";

//Note from Bmin- What is this doing? It's a decently big component functioning as a button?

const PostInput = () => {
  return (
    <div className="row offset-md-1 form-group">
      <div className="col-lg-5">
        <div className="card c-post">
          <div className="card-body">
            <Link className="cp-link" to={"/submit"}>
              <input
                type="text"
                className="form-control cp-input"
                placeholder="Say something about your day..."
                aria-label="create-post"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostInput;
