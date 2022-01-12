import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import LargePost from "./pages/LargePost";
import Navbar from "./components/Navbar";
import CreatePost from "./pages/CreatePost";
import Register from "./pages/Register";
import { useMe } from "./hooks/api";

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
