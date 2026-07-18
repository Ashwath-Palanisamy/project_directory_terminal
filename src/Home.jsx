import React from "react";
import "./Home.css";

export default function Home() {
    // Hardcoded array matching your Figma cards data structure
    const projects = [
        {
            id: 1,
            title: "Project onet",
            description: "dzflksdflkldskklfsdjkkfsdkfsdkfsdflskdkfsdkfsdfksdfkjsdflsdfsdfksdfklsdfsd",
            tags: "FLUTTER, EXE, GIT"
        },
        {
            id: 2,
            title: "Project 2",
            description: "dzflksdflkldskklfsdjkkfsdkfsdkfsdflskdkfsdkfsdfksdfkjsdflsdfsdfksdfklsdfsd",
            tags: "FLUTTER, EXE, GIT"
        },
        {
            id: 3,
            title: "Project 3 title",
            description: "dzflksdflkldskklfsdjkkfsdkfsdkfsdflskdkfsdkfsdfksdfkjsdflsdfsdfksdfklsdfsd",
            tags: "FLUTTER, EXE, GIT"
        }
    ];

    return (
        <>
            {/* Welcome */}
            <section>
                <h1>Welcome to my project directory!</h1>
                <p className="visitor-status">Logged in as Visitor</p>
                <p className="intro-text">
                    Hi, Welcome to my Project Directory! I will update every project i build
                    and will tell what was difficult with it and how i try to overcome it again,
                    thanks for viewing this directory if you want to know about me check About page :)
                </p>
            </section>

            {/* Projects Section */}
            <section>
                <h1>Projects with Blogs!</h1>

                {/* Responsive Grid Container */}
                <div className="projects-grid">
                    {projects.map((project) => (
                        <div key={project.id} className="project-card">
                            <div className="card-header">
                                <h3>{project.title}</h3>
                            </div>
                            <div className="card-body">
                                <p className="card-desc">{project.description}</p>
                                <div className="card-footer">
                                    <span className="tags">Tags: {project.tags}</span>
                                </div>

                            </div>
                            <a href={`/project/${project.id}`} className="read-more">
                                Continue reading</a>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}