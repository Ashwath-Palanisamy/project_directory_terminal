import React, { useEffect, useState } from "react";
import "../components/Navbar.css"
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const [PromptText, SetPromptText] = useState('');
    const [menuOpen, setMenuOpen] = useState(false); // Controls mobile menu toggle
    
    let page = useLocation();
    const fullText = page.pathname === '/dashboard' ? "admin@portfolio:~$" : "user@portfolio:~$";

    useEffect(() => {
        SetPromptText(''); 
        const typingInterval = setInterval(() => {
            SetPromptText((prev) => {
                if (prev.length >= fullText.length) {
                    clearInterval(typingInterval);
                    return prev;
                }
                return prev + fullText.charAt(prev.length);
            });
        }, 100);

        return () => clearInterval(typingInterval);
    }, [fullText]);

    return (
        <nav className="navbar">
            {/* Open / close menu on mobile*/}
            <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? "x" : "☰"}
            </button>

            {/* Show navigation prompt */}
            <div className="nav-prompt">
                {PromptText}<span className="cursor">_</span>
            </div>

             {/* Show navigation links  */}
            <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
                <li><Link to='/' onClick={() => setMenuOpen(false)}>Home</Link></li>
                <li><Link to='/projects' onClick={() => setMenuOpen(false)}>Project</Link></li>
                <li><Link to='/about' onClick={()=> setMenuOpen(false)}>About</Link></li>
            </ul>
        </nav>
    );
}