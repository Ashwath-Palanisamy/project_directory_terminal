import { db } from "../config/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

// Document References
const ABOUT_DOC_REF = doc(db, "siteContent", "about");
const TECH_STACK_DOC_REF = doc(db, "siteContent", "techStack");
const CONTACT_DOC_REF = doc(db, "siteContent", "contact");

/* =========================================
   ABOUT & IDENTITY
========================================= */

/**
 * Fetches the About & Identity content from Firestore.
 */
export async function getAbout() {
    try {
        const docSnap = await getDoc(ABOUT_DOC_REF);
        return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
        console.error("Error fetching About content:", error);
        throw error;
    }
}


/* =========================================
   TECH STACK
========================================= */

/**
 * Fetches Tech Stack data from Firestore.
 */
export async function getTechStack() {
    try {
        const docSnap = await getDoc(TECH_STACK_DOC_REF);
        return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
        console.error("Error fetching Tech Stack:", error);
        throw error;
    }
}


/* =========================================
   RESUME & CONTACT 
========================================= */

/**
 * Fetches Resume & Contact info from Firestore.
 */
export async function getContactInfo() {
    try {
        const docSnap = await getDoc(CONTACT_DOC_REF);
        return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
        console.error("Error fetching Contact info:", error);
        throw error;
    }
}

