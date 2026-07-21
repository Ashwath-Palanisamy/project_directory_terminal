import React from "react";
import "./Home.css";
import Footer from "../components/Footer";
import projectsData from "../data/ProjectData.js";

export default function Home() {
    
    return (
        <>
            {/* Welcome */}
            <section>
                <h1>Welcome to my project directory!</h1>
                <p className="visitor-status">Logged in as Visitor</p>
                <p className="intro-text">
                    Welcome to my project portfolio. Here, I showcase the applications I build along with the real-world challenges I faced during development and how I solved them. This space acts as a timeline of my practical engineering experience. To learn more about my background and skills, feel free to visit the About section.
                </p>
            </section>

            {/* Projects Section */}
            <section>
                <h1>Projects with Blogs!</h1>

                {/* Responsive Grid Container */}
                <div className="projects-grid">
                    {projectsData.slice(0,3).map((project) => (
                        <div key={project.id} className="project-card">
                            <div className="card-header">
                                <h3>{project.title}</h3>
                            </div>
                            <div className="card-body">
                                <p className="card-desc">{project.description}</p>
                                <div className="card-footer">
                                    <span className="tags">Tags: {project.tags.join(", ")}</span>
                                </div>

                            </div>
                            <a href={`/project/${project.id}`} className="read-more">
                                Continue reading</a>
                        </div>
                    ))}
                </div>
            </section>

            {/* about section - short */}
            <section className="about-section">
                <h1>About</h1>
                <p className="about-short-intro">
                    Hi i am Ashwath, a Computer Science student specializing in Applied AI, with a passion for building apps. Experienced with Flutter, Dart, Python, Firebase, and Supabase, I am currently learning React to expand my web skills. Seeking an internship to contribute to real-world codebases, learn from a team, and grow.
                </p>
            </section>
        </>
    );
}