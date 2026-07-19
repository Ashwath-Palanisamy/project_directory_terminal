import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "/src/config/firebase";

export default function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Silently monitor the active Firebase session status
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                // User is not logged in -> boot them back to the terminal prompt setup
                navigate("/predashboard", { replace: true });
            } else {
                setUser(currentUser);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    if (loading) {
        // Keeps the layout clean while verifying credentials
        return null; 
    }

    return <>{children}</>;
}