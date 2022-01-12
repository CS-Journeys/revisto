import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home";
import Login from "./pages/Login";
import LargePost from "./pages/LargePost";
import Navbar from "./components/Navbar";
import CreatePost from "./pages/CreatePost";
import Register from "./pages/Register";

const App = () => {
  const [user, setUser] = useState(null);

  //Retrive the current user
  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get("/users", config)
      .then(({ data }) => {
        const { err } = data;
        if (err) {
          console.log(err);
        } else {
          setUser(data.user);
        }
      })
      .catch((error) => {
        // Console log error
        console.log(`Could not get user: ${error}`);
      });
  }, []);

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
              <Route path="/post/:postId" element={<LargePost />} />
              <Route path="/submit" element={<CreatePost />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
};

export default App;
