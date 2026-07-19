import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import "./PreDashboard.css";

export default function PreDashboard() {
    const [Command, SetCommand] = useState("");
    const [terminalOutput, setTerminalOutput] = useState("");
    
    // Terminal Flow States: "COMMAND" | "EMAIL" | "PASSWORD"
    const [terminalState, setTerminalState] = useState("COMMAND");
    const [tempEmail, setTempEmail] = useState(""); 

    const navigate = useNavigate();
    const inputRef = useRef(null);

    // Initial check on load: if configuration is broken, let the developer know immediately
    useEffect(() => {
        if (!auth) {
            setTerminalOutput("Error: Firebase configuration missing or broken.");
        }
    }, []);

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            const cleanInput = Command.trim();
            const lowerInput = cleanInput.toLowerCase();

            // STEP 1: Handle command execution
            if (terminalState === "COMMAND") {
                if (lowerInput === "su ashwath" || lowerInput === "sudo su ashwath") {
                    // Check if a user is already authenticated locally via Firebase instance
                    if (auth?.currentUser) {
                        setTerminalOutput("Session active. Switched user successfully. Redirecting...");
                        setTimeout(() => navigate('/dashboard'), 1200);
                    } else {
                        setTerminalOutput("Authentication required.");
                        setTerminalState("EMAIL");
                        SetCommand("");
                    }
                } 
                // 💡 STEP 1b: Handle explicit logout / session termination commands
                else if (lowerInput === "logout" || lowerInput === "exit") {
                    if (auth?.currentUser) {
                        try {
                            setTerminalOutput("Logging out active session...");
                            await signOut(auth);
                            setTerminalOutput("Logged out successfully. Session closed.");
                        } catch (error) {
                            setTerminalOutput(`Logout failed: ${error.message}`);
                        }
                    } else {
                        setTerminalOutput("bash: logout: no active user session found.");
                    }
                    SetCommand("");
                } 
                else {
                    setTerminalOutput(`su: invalid user '${Command}'`);
                    SetCommand("");
                }
            } 
            
            // STEP 2: Collect Email address
            else if (terminalState === "EMAIL") {
                if (!cleanInput) return;
                setTempEmail(cleanInput);
                setTerminalState("PASSWORD");
                SetCommand("");
            } 
            
            // STEP 3: Collect Password & log in via Firebase
            else if (terminalState === "PASSWORD") {
                try {
                    setTerminalOutput("Authenticating user credentials...");
                    
                    if (!auth) throw new Error("Firebase Auth service unavailable.");
                    await signInWithEmailAndPassword(auth, tempEmail, cleanInput);
                    
                    setTerminalOutput("switched user successfully. Redirecting...");
                    // The global listener in ProtectedRoute will catch the auth change and seamlessly handle the rest!
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 1200);
                } catch (error) {
                    // Reset shell configuration back to standard state upon failure
                    setTerminalOutput(`Authentication failed: ${error.message}`);
                    setTerminalState("COMMAND");
                    setTempEmail("");
                    SetCommand("");
                }
            }
        }
    };

    const handleLineClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const getPromptText = () => {
        if (terminalState === "EMAIL") return "Enter Email: ";
        if (terminalState === "PASSWORD") return "Enter Password: ";
        return "root@portfolio:~$";
    };

    return (
        <div className="switch-user-wrapper" onClick={handleLineClick}>
            <div className="terminal-line">
                <span className="prompt-text">{getPromptText()}</span>
                <input 
                    ref={inputRef}
                    type={terminalState === "PASSWORD" ? "password" : "text"} 
                    value={Command} 
                    onChange={(e) => SetCommand(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="terminal-input"
                    autoComplete="off"
                    spellCheck="false"
                    autoFocus
                />
            </div>

            {terminalOutput && (
                <div className={`terminal-feedback ${
                    terminalOutput.toLowerCase().includes('failed') || 
                    terminalOutput.toLowerCase().includes('invalid') || 
                    terminalOutput.toLowerCase().includes('error') 
                    ? 'error' 
                    : 'success'
                }`}>
                    {terminalOutput}
                </div>
            )}
        </div>
    );
}