import React, { useEffect, useState } from "react";
import { getAbout, getTechStack, getContactInfo } from "../data/About.js";
import "./About.css";
import linkedInIcon from "../assets/linkedin-svgrepo-com.svg";

export default function About() {
    const [aboutData, setAboutData] = useState(null);
    const [techStackData, setTechStackData] = useState([]);
    const [contactData, setContactData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function fetchContent() {
            try {
                // Fetch all section data concurrently
                const [about, techStack, contact] = await Promise.all([
                    getAbout(),
                    getTechStack(),
                    getContactInfo()
                ]);

                if (isMounted) {
                    if (about) setAboutData(about);
                    if (techStack && Array.isArray(techStack.items)) setTechStackData(techStack.items);
                    if (contact) setContactData(contact);
                }
            } catch (error) {
                console.error("Error fetching About page content:", error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchContent();

        return () => {
            isMounted = false;
        };
    }, []);

    // Identity data populated from Firestore with local fallbacks
    const identity = {
        realName: aboutData?.realName || "Ashwath",
        onlineIdentity: aboutData?.onlineIdentity || "AKSG",
        role: aboutData?.role || "Full-Stack & Mobile Developer",
        whatIDo: aboutData?.whatIDo || "Build interactive web dashboards, cross-platform mobile apps, and real-time backend systems.",
        status: aboutData?.status || "Computer Science (Applied AI) Student — Open for Internships & Collaborations.",
        bioParagraph1: aboutData?.bioParagraph1 || "Hi, I am Ashwath! I am a Computer Science engineering student specializing in Applied AI with a strong focus on software development. I build cross-platform mobile apps using Flutter & Dart, craft full-stack web platforms using React, and manage backends with Firebase, Supabase, and Python.",
        bioParagraph2: aboutData?.bioParagraph2 || "I am actively seeking software engineering and developer internship opportunities to contribute to production codebases, collaborate with engineering teams, and solve practical problems."
    };

    // Contact info populated from Firestore with local fallbacks
    const contactInfo = {
        resumeUrl: contactData?.resumeUrl || "/resume.pdf",
        email: contactData?.email || "ashwath.palanisamy08@gmail.com",
        linkedinUrl: contactData?.linkedinUrl || "https://www.linkedin.com/in/ashwathpalanisamy"
    };

    // Default Tech Stack fallback rows
    const defaultTechStack = [
        { category: "Languages", description: "Core Programming", technologies: "JavaScript, Dart, Python, HTML5, CSS3, SQL" },
        { category: "Frontend", description: "Web User Interfaces", technologies: "React.js, CSS Modules, HTML5 Dialog API" },
        { category: "Mobile & Cross-Platform", description: "Smartphone Apps", technologies: "Flutter, Dart" },
        { category: "Backend & Cloud", description: "Databases & Servers", technologies: "Node.js, Express, Flask, Firebase (Firestore, Auth, FCM), Supabase" },
        { category: "Environment & Tooling", description: "Development Setup", technologies: "Linux, Git, Vercel, REST APIs" }
    ];

    const displayTechStack = techStackData.length > 0 ? techStackData : defaultTechStack;

    if (loading) {
        return (
            <div className="about-container">
                <div className="terminal-loading">
                    <p>admin@portfolio:~$ loading_about_data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="about-container">
            {/* Identity Section */}
            <section className="name-section">
                <h1>Identity</h1>
                <div className="name-row">
                    <p><strong>Real Name:</strong> {identity.realName}</p>
                    <p><strong>Online Identity:</strong> {identity.onlineIdentity}</p>
                    <p><strong>Role:</strong> {identity.role}</p>
                </div>
            </section>

            {/* Quick Overview */}
            <section className="summary-section">
                <h1>Quick Overview</h1>
                <div className="summary-card">
                    <p><strong>What I Do:</strong> {identity.whatIDo}</p>
                    <p><strong>Status:</strong> {identity.status}</p>
                </div>
            </section>

            {/* Bio Section */}
            <section className="bio-section">
                <h1>Bio</h1>
                <p>{identity.bioParagraph1}</p>
                {identity.bioParagraph2 && <p>{identity.bioParagraph2}</p>}
            </section>

            {/* Tech Stack Table */}
            <section className="tech-stack-section">
                <h1>Tech Stack</h1>
                <table className="tech-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Technologies &amp; Tools</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayTechStack.map((item, index) => (
                            <tr key={item.id || index}>
                                <td>{item.category}</td>
                                <td>{item.description}</td>
                                <td>{item.technologies}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Resume & Links */}
            <section className="actions-section">
                <h1>Resume and Contact</h1>
                <div className="action-buttons">
                    <a 
                        href={contactInfo.resumeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        download={contactInfo.resumeUrl.endsWith('.pdf')} 
                        className="terminal-btn"
                    >
                        📄 Download Resume
                    </a>
                    <a 
                        href={`mailto:${contactInfo.email}`} 
                        className="terminal-btn"
                    >
                        ✉️ Send Email
                    </a>
                    <a 
                        href={contactInfo.linkedinUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="terminal-btn"
                    >
                        <img src={linkedInIcon} alt="LinkedIn" className="terminal-icon" />
                        LinkedIn
                    </a>
                </div>
            </section>
        </div>
    );
}