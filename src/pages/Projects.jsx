import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../data/ProjectData";
import "./Home.css";

export default function Home() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function fetchProjects() {
            try {
                const data = await getProjects();
                if (isMounted) {
                    setProjects(data);
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchProjects();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <div style={{ margin: "1rem" }}>
                <div className="terminal-loading">
                    <p>admin@portfolio:~$ loading_projects...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ margin: "1rem" }}>
            <div className="projects-grid">
                {projects.map((project) => (
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
        </div>
    );
}