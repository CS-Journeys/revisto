import React, { Component } from 'react';
import PostsList from './components/PostsList';
import Navbar from './components/Navbar';

class App extends Component {
    /*
     * constructor(props)
     *
     * Constructor for App componenet
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

    /*
     * render()
     *
     * Renders the components
    */
    render() {
        let user = this.state.user;

        if (user.phone != "") {
            return (
                <div className="App">
                    <Navbar/>
                    <br/>
                    <div className="container-fluid">
                        {/* Render home page */}
                        <PostsList/>
                    </div>
                </div>
            );
        } else {
            // Redirect to login page
            return (<h1>No User Found</h1>);
        }
    }
}

export default App;