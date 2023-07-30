import "./App.css";
import React, { Component } from "react";
import Navbar from "./compononents/Navbar";
import News from "./compononents/News";
import About from "./compononents/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div >
          <Navbar />
          <Routes>
            <Route path="/" element={<News />} />
            <Route path="/home" element={<News MyPageSize={5}/>} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
