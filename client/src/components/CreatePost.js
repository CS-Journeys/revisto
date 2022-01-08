import React, { Component } from "react";

class CreatePost extends Component {
    render() {
        return (
            <div className="row d-flex offset-md-1">
                <div className="col-md-5">
                  <textarea type="text" className="form-control c-post" placeholder="Say something about your day..." />  
                </div>
            </div>
        );
    }
}

export default CreatePost;