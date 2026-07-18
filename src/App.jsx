import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./Home";

function About() {
  return <h1>About</h1>;
}

function App() {
  return (
    <div className="terminal-frame">
      <Navbar />
      <div className="terminal-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;