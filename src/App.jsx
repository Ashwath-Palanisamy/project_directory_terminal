import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./pages/Home";
import PreDashboard from "./pages/dashboard/PreDashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";

function About() {
  return <h1>About</h1>;
}

function Projects() {
  return <h1>projects</h1>;
}

function App() {
  return (
    <div className="terminal-frame">
      <Navbar />
      <div className="terminal-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/projects' element={<Projects/>}/>
          <Route path="/about" element={<About />} />
          <Route path="/predashboard" element={<PreDashboard/>}/>
          
          {/*  Protected Route mapping */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;