import React from "react";
import { useLocation } from "react-router-dom";
import "./PageTransition.css";

// 💡 FIXED: Accepts { children } prop which represents the active <Outlet /> view from App.jsx
export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    /* The key attribute forces React to rebuild this node and re-trigger the CSS animation */
    <div key={location.pathname} className="fade-in-page">
      {children}
    </div>
  );
}