import React from "react";
import { Link } from "react-router-dom";

//Note from Bmin- What is this doing? It's a decently big component functioning as a button?

const PostInput = (props) => {

  let linkTo = "/submit";

  if (!props.user) linkTo="/login"

  return (
    <div className="row offset-md-1 form-group">
      <div className="col-lg-5">
        <div className="card c-post">
          <div className="card-body">
            <Link className="cp-link" to={linkTo}>
              <input
                type="text"
                className="form-control cf-control cp-input"
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
