import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import emailIcon from "../assets/email-1-svgrepo-com.svg";
import linkedInIcon from "../assets/linkedin-svgrepo-com.svg";
import githubIcon from "../assets/github-142-svgrepo-com.svg";
import "./Footer.css";

export default function Footer() {

    let page = useLocation();
    const fullText = page.pathname === '/dashboard' ? "admin@portfolio:~$ footer" : "user@portfolio:~$ footer";

    return (
        <footer className="terminal-footer">
            <div className="footer-prompt">{fullText}</div>
            <div className="footer-content">
                <div className="footer-column">
                    <div className="foo-nav-heading">Navigation</div>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/projects">Projects</Link></li>
                        <li><Link to="/about">About</Link></li>
                        
                    </ul>
                </div>
                <div className="footer-column footer-contact-column">
                    <div className="foo-nav-heading">Contacts & Links</div>
                    <ul className="footer-contact-list">
                        <li>
                            <img className="contact-icon" src={emailIcon} alt="" aria-hidden="true" />
                            <a href="mailto:ashwath.palanisamy08@gmail.com">Email</a>
                        </li>
                        <li>
                            <img className="contact-icon" src={linkedInIcon} alt="" aria-hidden="true" />
                            <a href="https://linkedin.com/in/ashwathpalanisamy" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </li>
                        <li>
                            <img className="contact-icon" src={githubIcon} alt="" aria-hidden="true" />
                            <a href="https://github.com/Ashwath-Palanisamy" target="_blank" rel="noopener noreferrer">Github</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}