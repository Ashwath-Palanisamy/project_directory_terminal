import React, { useRef } from "react";
import "./Dashboard.css";

export default function Dashboard(){
    // 1. Create a reference pointer to connect to the dialog element
    const dialogRef = useRef(null);

    // 2. Open the built-in modal window
    const openModal = () => dialogRef.current?.showModal();

    // 3. Close the window
    const closeModal = () => dialogRef.current?.close();

    // 4. Close if the user clicks the outer backdrop area
    const handleBackdropClick = (e) => {
        if (e.target === dialogRef.current) {
            closeModal();
        }
    };

    return (
        <div className="dashboard-container">
            <h1>Welcome back, Admin</h1>
            <p className="login-status">Logged in as Admin</p>

            <div className="section-header">
                <h1 className="section-title">Project update</h1>
                {/* Click triggers  popup */}
                <button className="dashboard-buttons" onClick={openModal}>Add project</button>
            </div>

            <dialog 
                ref={dialogRef} 
                onClick={handleBackdropClick}
                className="popup-modal"
            >
                <h1 className="modal-terminal-title">admin@portfolio:~$ New-project </h1>
                
                <form className="new-project-form" onSubmit={(e) => e.preventDefault()}>
                    
                    <div className="form-group">
                        <label>Project name:</label>
                        <input type="text" spellCheck="true" autoComplete="on" />
                    </div>
                    
                    <div className="form-group">
                        <label>Tags:</label>
                        <input type="text" spellCheck="false" autoComplete="on" />
                    </div>
                    
                    <div className="form-group">
                        <label>Description</label>
                        <textarea type='text' spellCheck="true" autoComplete="false" autoCorrect="true" autoSave="true"></textarea>
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={closeModal} className="dashboard-buttons">close</button>
                    </div>
                </form>
            </dialog>
        </div>
    );
}