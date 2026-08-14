import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectById } from "../data/ProjectData";
import "./ProjectDetails.css";

export default function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function fetchProject() {
            try {
                const data = await getProjectById(id);
                if (isMounted) {
                    setProject(data);
                }
            } catch (error) {
                console.error(`Error fetching project ${id}:`, error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchProject();

        return () => {
            isMounted = false;
        };
    }, [id]);

    if (loading) {
        return (
            <div className="project-detail-container">
                <div className="terminal-loading">
                    <p>admin@portfolio:~$ loading_project_details...</p>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="project-detail-container error-view">
                <h2>Error: Project 404 not found.</h2>
                <Link to="/" className="back-link error-link">&lt; Back to home</Link>
            </div>
        );
    }

    // Standardize tech list: uses tags array saved from Firestore form
    const techList = Array.isArray(project.tags) ? project.tags : (project.tech || []);

    return (
        <div className="project-detail-container">
            <Link to="/" className="back-link">&lt; Back to home</Link>
            
            <h1 className="project-folder">
                ./{project.folderName || project.id}
            </h1>
            
            <h2 className="project-main-title">{project.title}</h2>
            
            <div className="project-info">
                <span className="project-info-badge">
                    Availability: {project.availability}
                </span>
                
                {project.links && Object.keys(project.links).length > 0 && (
                    <div className="project-links">
                        {Object.entries(project.links).map(([platform, url]) => (
                            <a 
                                key={platform}
                                href={url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="project-link-btn"
                            >
                                {platform} &#x2197;
                            </a>
                        ))}
                    </div>
                )}
            </div>
            
            <p className="project-full-desc">
                {project.description}
            </p>

            {techList.length > 0 && (
                <div className="tech-section">
                    <strong>Technologies used:</strong>
                    <div className="tech-badges-wrapper">
                        {techList.map((tech, idx) => (
                            <span key={idx} className="tech-spec-badge">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}