import React from "react";
import { Link } from "react-router-dom";

/*
 *
*/
const PostInput = (props) => {
    let linkTo = props.user ? "/submit" : "/login";

    return (
        <div className="row offset-md-1 form-group">
            <div className="col-lg-5">
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
    );
};

export default PostInput;