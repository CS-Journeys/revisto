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
                    <div className="container-fluid">
                        {/* Render home page */}
                        <h1>Hello world, these are the post titles:</h1>
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