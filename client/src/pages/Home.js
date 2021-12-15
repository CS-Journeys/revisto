import React, { Component } from 'react';
import PostsList from '../components/PostsList';
import Navbar from '../components/Navbar';

class Home extends Component {
    /*
     * constructor(props)
     *
     * Constructor for Home componenet
    */
    constructor(props) {
        super(props);

        // Static data
        this.state = {
            user: this.props.user
        }
    }
    
    render() {
        return (<div className="App">
            <Navbar/>
            <br/>
            <div className="container-fluid">
                {/* Render home page */}
                <PostsList/>
            </div>
        </div>);
    }
}

export default Home;