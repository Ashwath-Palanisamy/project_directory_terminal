import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Footer from "../components/Footer";
import { getProjects } from "../data/ProjectData";

export default function Home() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function fetchHomeProjects() {
            try {
                const data = await getProjects();
                if (isMounted) {
                    setProjects(data);
                }
            } catch (error) {
                console.error("Error fetching projects for Home page:", error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchHomeProjects();

        return () => {
            isMounted = false;
        };
    }, []);

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

                {loading ? (
                    <div className="terminal-loading">
                        <p>admin@portfolio:~$ loading_latest_projects...</p>
                    </div>
                ) : projects.length === 0 ? (
                    <p>No projects found.</p>
                ) : (
                    /* Responsive Grid Container */
                    <div className="projects-grid">
                        {projects.slice(0, 3).map((project) => (
                            <div key={project.id} className="project-card">
                                <div className="card-header">
                                    <h3>{project.title}</h3>
                                </div>
                                <div className="card-body">
                                    <p className="card-desc">{project.description}</p>
                                    <div className="card-footer">
                                        <span className="tags">
                                            Tags: {Array.isArray(project.tags) && project.tags.length > 0
                                                ? project.tags.join(", ")
                                                : "N/A"}
                                        </span>
                                    </div>
                                </div>
                                <Link to={`/project/${project.id}`} className="read-more">
                                    Continue reading
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* About section - short */}
            <section className="about-section">
                <h1>About</h1>
                <p className="about-short-intro">
                    Hi, I am Ashwath, a Computer Science student specializing in Applied AI, with a passion for building apps. Experienced with Flutter, Dart, Python, Firebase, and Supabase, I am currently learning React to expand my web skills. Seeking an internship to contribute to real-world codebases, learn from a team, and grow.
                </p>
            </section>
        </>
    );
}