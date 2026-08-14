import React, { useRef, useState, useEffect } from "react";
import { 
    saveProject, 
    saveAbout, 
    getAbout, 
    saveTechStack, 
    getTechStack,
    saveContactInfo,
    getContactInfo
} from "./Dashboard.js";
import "./Dashboard.css";

export default function Dashboard() {
    // Modal Refs
    const projectDialogRef = useRef(null);
    const aboutDialogRef = useRef(null);
    const techDialogRef = useRef(null);
    const contactDialogRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    
    // Toast notification state: { type: "success" | "error", text: string } | null
    const [toast, setToast] = useState(null);

    // Dynamic Form States
    const emptyProjectState = {
        projectName: "",
        tags: "",
        description: "",
        availability: "public",
        github: "",
        linkedin: "",
        site: ""
    };

    const [projectFormData, setProjectFormData] = useState(emptyProjectState);

    const [aboutFormData, setAboutFormData] = useState({
        realName: "",
        onlineIdentity: "",
        role: "",
        whatIDo: "",
        status: "",
        bioParagraph1: "",
        bioParagraph2: ""
    });

    const [techStackData, setTechStackData] = useState([]);

    const [contactFormData, setContactFormData] = useState({
        resumeUrl: "",
        email: "",
        linkedinUrl: ""
    });

    // Fetch existing site data from database on mount
    useEffect(() => {
        async function fetchDashboardData() {
            setFetching(true);
            try {
                const [about, techStack, contact] = await Promise.all([
                    getAbout?.(),
                    getTechStack?.(),
                    getContactInfo?.()
                ]);

                if (about) setAboutFormData(about);
                if (techStack?.items) setTechStackData(techStack.items);
                else if (Array.isArray(techStack)) setTechStackData(techStack);
                if (contact) setContactFormData(contact);

            } catch (error) {
                console.error("Error loading dashboard data:", error);
                triggerToast("error", "[ERROR] Failed to fetch current database content.");
            } finally {
                setFetching(false);
            }
        }

        fetchDashboardData();
    }, []);

    // Toast Trigger
    const triggerToast = (type, text) => {
        setToast({ type, text });
        setTimeout(() => {
            setToast(null);
        }, 3000);
    };

    // Open/Close Handlers
    const openModal = (ref) => ref.current?.showModal();
    const closeModal = (ref, resetFn, initialState) => {
        if (resetFn && initialState) resetFn(initialState);
        ref.current?.close();
    };

    const handleBackdropClick = (e, ref, resetFn, initialState) => {
        if (e.target === ref.current) {
            closeModal(ref, resetFn, initialState);
        }
    };

    // Form Field Handlers
    const handleProjectChange = (e) => {
        const { name, value } = e.target;
        setProjectFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAboutChange = (e) => {
        const { name, value } = e.target;
        setAboutFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContactFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTechStackChange = (index, field, value) => {
        setTechStackData((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const addTechRow = () => {
        setTechStackData((prev) => [
            ...prev,
            { category: "", description: "", technologies: "" }
        ]);
    };

    const removeTechRow = (index) => {
        setTechStackData((prev) => prev.filter((_, i) => i !== index));
    };

    // Save Handlers
    const handleSaveProject = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await saveProject(projectFormData);
            closeModal(projectDialogRef, setProjectFormData, emptyProjectState);
            triggerToast("success", "[SUCCESS] Project written to database.");
        } catch (error) {
            console.error("Failed to save project:", error);
            triggerToast("error", `[ERROR] ${error.message || "Execution failed."}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveAbout = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (saveAbout) await saveAbout(aboutFormData);
            closeModal(aboutDialogRef);
            triggerToast("success", "[SUCCESS] About section updated successfully.");
        } catch (error) {
            console.error("Failed to update about section:", error);
            triggerToast("error", `[ERROR] ${error.message || "Failed to update About section."}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveTechStack = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (saveTechStack) await saveTechStack(techStackData);
            closeModal(techDialogRef);
            triggerToast("success", "[SUCCESS] Tech stack updated successfully.");
        } catch (error) {
            console.error("Failed to update tech stack:", error);
            triggerToast("error", `[ERROR] ${error.message || "Failed to update Tech Stack."}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveContact = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (saveContactInfo) await saveContactInfo(contactFormData);
            closeModal(contactDialogRef);
            triggerToast("success", "[SUCCESS] Resume & Contact info updated successfully.");
        } catch (error) {
            console.error("Failed to update contact info:", error);
            triggerToast("error", `[ERROR] ${error.message || "Failed to update Contact info."}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-container">
            {/* Terminal Popup Toast Notification */}
            {toast && (
                <div className={`terminal-toast toast-${toast.type}`}>
                    <div className="toast-header">
                        <span className="toast-title">admin@portfolio:~$ status</span>
                        <button className="toast-close" onClick={() => setToast(null)}>
                            &times;
                        </button>
                    </div>
                    <div className="toast-body">
                        <span className="toast-prompt">admin@portfolio:~$</span> {toast.text}
                    </div>
                </div>
            )}

            <h1>Welcome back, Admin</h1>
            <p className="login-status">
                {fetching ? "Syncing data from database..." : "Logged in as Admin"}
            </p>

            {/* Section 1: Project Update */}
            <div className="section-header">
                <h1 className="section-title">Project update</h1>
                <button className="dashboard-buttons" onClick={() => openModal(projectDialogRef)}>
                    Add project
                </button>
            </div>

            {/* Section 2: About Update */}
            <div className="section-header">
                <h1 className="section-title">About &amp; Identity update</h1>
                <button className="dashboard-buttons" onClick={() => openModal(aboutDialogRef)}>
                    Edit About
                </button>
            </div>

            {/* Section 3: Tech Stack Update */}
            <div className="section-header">
                <h1 className="section-title">Tech Stack update</h1>
                <button className="dashboard-buttons" onClick={() => openModal(techDialogRef)}>
                    Edit Tech Stack
                </button>
            </div>

            {/* Section 4: Resume & Contact Update */}
            <div className="section-header">
                <h1 className="section-title">Resume &amp; Contact update</h1>
                <button className="dashboard-buttons" onClick={() => openModal(contactDialogRef)}>
                    Edit Contact &amp; Links
                </button>
            </div>

            {/* =========================================
                MODAL 1: PROJECT UPDATE
            ========================================= */}
            <dialog 
                ref={projectDialogRef} 
                onClick={(e) => handleBackdropClick(e, projectDialogRef, setProjectFormData, emptyProjectState)}
                className="popup-modal"
            >
                <h1 className="modal-terminal-title">admin@portfolio:~$ New-project</h1>

                <form className="new-project-form" onSubmit={handleSaveProject}>
                    <div className="form-group">
                        <label>Project name:</label>
                        <input 
                            type="text" 
                            name="projectName"
                            value={projectFormData.projectName}
                            onChange={handleProjectChange}
                            spellCheck="true" 
                            autoComplete="on" 
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Availability:</label>
                        <select 
                            name="availability"
                            value={projectFormData.availability}
                            onChange={handleProjectChange}
                            className="terminal-select"
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>

                    {projectFormData.availability === "public" && (
                        <>
                            <div className="form-group">
                                <label>GitHub URL (optional):</label>
                                <input 
                                    type="url" 
                                    name="github"
                                    value={projectFormData.github}
                                    onChange={handleProjectChange}
                                    placeholder="https://github.com/..."
                                />
                            </div>

                            <div className="form-group">
                                <label>LinkedIn Post/Article URL (optional):</label>
                                <input 
                                    type="url" 
                                    name="linkedin"
                                    value={projectFormData.linkedin}
                                    onChange={handleProjectChange}
                                    placeholder="https://linkedin.com/..."
                                />
                            </div>

                            <div className="form-group">
                                <label>Live Site URL (optional):</label>
                                <input 
                                    type="url" 
                                    name="site"
                                    value={projectFormData.site}
                                    onChange={handleProjectChange}
                                    placeholder="https://..."
                                />
                            </div>
                        </>
                    )}
                    
                    <div className="form-group">
                        <label>Tags (comma separated):</label>
                        <input 
                            type="text" 
                            name="tags"
                            value={projectFormData.tags}
                            onChange={handleProjectChange}
                            spellCheck="false" 
                            autoComplete="on" 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea 
                            name="description"
                            value={projectFormData.description}
                            onChange={handleProjectChange}
                            spellCheck="true" 
                            className="Desc"
                            required
                        ></textarea>
                    </div>
                    
                    <div className="form-actions">
                        <button type="submit" className="dashboard-buttons" disabled={loading}>
                            {loading ? "Writing to DB..." : "Save"}
                        </button>
                        <button 
                            type="button" 
                            onClick={() => closeModal(projectDialogRef, setProjectFormData, emptyProjectState)} 
                            className="dashboard-buttons"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </dialog>

            {/* =========================================
                MODAL 2: ABOUT & IDENTITY UPDATE
            ========================================= */}
            <dialog 
                ref={aboutDialogRef} 
                onClick={(e) => handleBackdropClick(e, aboutDialogRef)}
                className="popup-modal"
            >
                <h1 className="modal-terminal-title">admin@portfolio:~$ Update-about</h1>

                <form className="new-project-form" onSubmit={handleSaveAbout}>
                    <h3>Identity</h3>
                    <div className="form-group">
                        <label>Real Name:</label>
                        <input 
                            type="text" 
                            name="realName"
                            value={aboutFormData.realName}
                            onChange={handleAboutChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Online Identity:</label>
                        <input 
                            type="text" 
                            name="onlineIdentity"
                            value={aboutFormData.onlineIdentity}
                            onChange={handleAboutChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Role:</label>
                        <input 
                            type="text" 
                            name="role"
                            value={aboutFormData.role}
                            onChange={handleAboutChange}
                            required
                        />
                    </div>

                    <h3>Quick Overview</h3>
                    <div className="form-group">
                        <label>What I Do:</label>
                        <textarea 
                            name="whatIDo"
                            value={aboutFormData.whatIDo}
                            onChange={handleAboutChange}
                            className="Desc"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Status:</label>
                        <input 
                            type="text" 
                            name="status"
                            value={aboutFormData.status}
                            onChange={handleAboutChange}
                            required
                        />
                    </div>

                    <h3>Bio</h3>
                    <div className="form-group">
                        <label>Bio Paragraph 1:</label>
                        <textarea 
                            name="bioParagraph1"
                            value={aboutFormData.bioParagraph1}
                            onChange={handleAboutChange}
                            className="Desc"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Bio Paragraph 2:</label>
                        <textarea 
                            name="bioParagraph2"
                            value={aboutFormData.bioParagraph2}
                            onChange={handleAboutChange}
                            className="Desc"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="dashboard-buttons" disabled={loading}>
                            {loading ? "Writing to DB..." : "Save About"}
                        </button>
                        <button 
                            type="button" 
                            onClick={() => closeModal(aboutDialogRef)} 
                            className="dashboard-buttons"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </dialog>

            {/* =========================================
                MODAL 3: TECH STACK UPDATE
            ========================================= */}
            <dialog 
                ref={techDialogRef} 
                onClick={(e) => handleBackdropClick(e, techDialogRef)}
                className="popup-modal popup-modal-large"
            >
                <h1 className="modal-terminal-title">admin@portfolio:~$ Update-tech-stack</h1>

                <form className="new-project-form" onSubmit={handleSaveTechStack}>
                    {techStackData.length === 0 ? (
                        <p style={{ color: "#888", fontSize: "0.9rem" }}>No categories present. Click below to add one.</p>
                    ) : (
                        techStackData.map((item, index) => (
                            <div key={index} className="tech-row-group">
                                <div className="tech-row-header">
                                    <span>Row #{index + 1}</span>
                                    <button 
                                        type="button" 
                                        className="remove-btn"
                                        onClick={() => removeTechRow(index)}
                                    >
                                        [Remove]
                                    </button>
                                </div>
                                <div className="form-group">
                                    <label>Category:</label>
                                    <input 
                                        type="text" 
                                        value={item.category}
                                        onChange={(e) => handleTechStackChange(index, "category", e.target.value)}
                                        placeholder="e.g. Languages"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description:</label>
                                    <input 
                                        type="text" 
                                        value={item.description}
                                        onChange={(e) => handleTechStackChange(index, "description", e.target.value)}
                                        placeholder="e.g. Core Programming"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Technologies &amp; Tools:</label>
                                    <input 
                                        type="text" 
                                        value={item.technologies}
                                        onChange={(e) => handleTechStackChange(index, "technologies", e.target.value)}
                                        placeholder="e.g. JavaScript, Dart, Python"
                                        required
                                    />
                                </div>
                            </div>
                        ))
                    )}

                    <button type="button" onClick={addTechRow} className="dashboard-buttons add-row-btn">
                        + Add Tech Category Row
                    </button>

                    <div className="form-actions">
                        <button type="submit" className="dashboard-buttons" disabled={loading}>
                            {loading ? "Writing to DB..." : "Save Tech Stack"}
                        </button>
                        <button 
                            type="button" 
                            onClick={() => closeModal(techDialogRef)} 
                            className="dashboard-buttons"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </dialog>

            {/* =========================================
                MODAL 4: RESUME & CONTACT UPDATE
            ========================================= */}
            <dialog 
                ref={contactDialogRef} 
                onClick={(e) => handleBackdropClick(e, contactDialogRef)}
                className="popup-modal"
            >
                <h1 className="modal-terminal-title">admin@portfolio:~$ Update-resume-contact</h1>

                <form className="new-project-form" onSubmit={handleSaveContact}>
                    <div className="form-group">
                        <label>Resume Link / File URL:</label>
                        <input 
                            type="text" 
                            name="resumeUrl"
                            value={contactFormData.resumeUrl}
                            onChange={handleContactChange}
                            placeholder="/resume.pdf or https://..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Contact Email:</label>
                        <input 
                            type="email" 
                            name="email"
                            value={contactFormData.email}
                            onChange={handleContactChange}
                            placeholder="your.email@domain.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>LinkedIn Profile URL:</label>
                        <input 
                            type="url" 
                            name="linkedinUrl"
                            value={contactFormData.linkedinUrl}
                            onChange={handleContactChange}
                            placeholder="https://www.linkedin.com/in/yourprofile"
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="dashboard-buttons" disabled={loading}>
                            {loading ? "Writing to DB..." : "Save Contact Info"}
                        </button>
                        <button 
                            type="button" 
                            onClick={() => closeModal(contactDialogRef)} 
                            className="dashboard-buttons"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </dialog>
        </div>
    );
}