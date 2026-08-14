import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./pages/Home";
import PreDashboard from "./pages/dashboard/PreDashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetails";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import About from "./pages/About";



function App() {
  return (
    <div className="terminal-frame">
      <Navbar />
      <div className="terminal-body">
        <Routes>
          <Route element={<PageTransition><Outlet/></PageTransition>}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/predashboard" element={<PreDashboard />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            
            {/* Protected Route */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;