import React, { Component } from "react";
import { Link } from 'react-router-dom';

class PostInput extends Component {
    render() {
        return (
            <div className="row offset-md-1 form-group">
                <div className="col-lg-5">
                    <div className="card c-post">
                        <div className="card-body">
                            <Link className="cp-link" to="/submit"><input type="text" className="form-control cp-input"
                                placeholder="Say something about your day..." aria-label="create-post" /></Link>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default PostInput;