import React from "react";
import { useParams, Link } from "react-router-dom";
import projectsData from "../data/ProjectData";
import "./ProjectDetails.css";

export default function ProjectDetail() {
    const { id } = useParams();
    const project = projectsData.find((p) => p.id === parseInt(id));

    if (!project) {
        return (
            <div className="project-detail-container error-view">
                <h2>&gt; Error: Project 404 not found.</h2>
                <Link to="/" className="back-link error-link">&lt; Back to home</Link>
            </div>
        );
    }

    return (
        <div className="project-detail-container">
            <Link to="/" className="back-link">&lt; Back to home</Link>
            
            <h1 className="project-folder">
                ./{project.folderName}
            </h1>
            
            <h2 className="project-main-title">{project.title}</h2>
            <div className="project-info">
                <span className="project-info-badge">
                    Availability: {project.availability}
                </span>
                
                
                {project.links && Object.keys(project.links).length > 0 && (
                    <div className="project-links-wrapper" style={{ display: "inline-flex", gap: "1rem", marginLeft: "1rem" }}>
                        {Object.entries(project.links).map(([platform, url]) => (
                            <a 
                                key={platform}
                                href={url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`project-link-${platform.toLowerCase()}`}
                            >
                                [{platform}]
                            </a>
                        ))}
                    </div>
                )}
            </div>
            
            <p className="project-full-desc">
                {project.description}
            </p>

            <div className="tech-section">
                <strong>Technologies used:</strong>
                <div className="tech-badges-wrapper">
                    {project.tech.map((tech, idx) => (
                        <span key={idx} className="tech-spec-badge">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}