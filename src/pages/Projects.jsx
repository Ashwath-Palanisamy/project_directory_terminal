import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"
import projectsData from "../data/ProjectData";

export default function Projects() {
    return (
        <div style={{"margin": "1rem"}}>
            <div className="projects-grid">
                {projectsData.map((project) => (
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
                        <Link to={`/project/${project.id}`} className="read-more">
                            Continue reading</Link>
                    </div>

                ))}
            </div>
        </div>
    )
};