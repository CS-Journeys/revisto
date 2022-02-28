import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import LargePost from "./pages/LargePost";
import Navbar from "./components/Navbar";
import CreatePost from "./pages/CreatePost";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import About from "./pages/About";

import { useMe } from "./services/userService";

/**
 * Main file for react component rendering
 *
 * @returns {JSX.Element} The website
 */

const App = () => {
    const { user } = useMe();

    return (
        <div className="App container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-lg-10">
                    <BrowserRouter>
                        <Navbar user={user} />
                        <br />
                        <Routes>
                            <Route path="/" element={<Home user={user} />} />
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/post/:postId"
                                element={<LargePost />}
                            />
                            <Route
                                path="/submit"
                                element={<CreatePost user={user} />}
                            />
                            <Route path="/about" element={<About />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/me"
                                element={<Profile user={user} />}
                            />
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </div>
    );
};

export default App;
