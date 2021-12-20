import React, { Component } from 'react';

/*
 * React Router passes two props:
 *  match: holds url param info
 *  location: holds url path info
*/

class LargePost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null
        }
    }

    render() {
        return (<h1>Hello World</h1>);
    }
}

export default LargePost;