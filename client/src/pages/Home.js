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
            user: {
                phone: "5551234569"
            }
        }
    }
    
    render() {
        if (this.state.user.phone != "") {
            return (
            <div className="App">
                <Navbar/>
                <br/>
                <div className="container-fluid">
                    {/* Render home page */}
                    <PostsList/>
                </div>
            </div>);
        } else {
            return (<h1>No User Found!</h1>);
        }
    }
}

export default Home;