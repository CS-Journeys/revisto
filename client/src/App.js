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
import PageNotFound from "./pages/PageNotFound";

import { useMe } from "./hooks/userHook";

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
                            <Route
                                exact
                                path="/"
                                element={<Home user={user} />}
                            />
                            <Route path="/login" element={<Login />} />
                            <Route
                                exact
                                path="/post/:postId"
                                element={<LargePost user={user} />}
                            />
                            <Route
                                exact
                                path="/submit"
                                element={<CreatePost user={user} />}
                            />
                            <Route exact path="/about" element={<About />} />
                            <Route
                                exact
                                path="/register"
                                element={<Register />}
                            />
                            <Route
                                exact
                                path="/me"
                                element={<Profile user={user} />}
                            />
                            <Route path="/*" element={<PageNotFound />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </div>
    );
};

export default App;
