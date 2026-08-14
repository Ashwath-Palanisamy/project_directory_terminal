import { db } from "../../config/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

// Document References
const ABOUT_DOC_REF = doc(db, "siteContent", "about");
const TECH_STACK_DOC_REF = doc(db, "siteContent", "techStack");
const CONTACT_DOC_REF = doc(db, "siteContent", "contact");

/* =========================================
   PROJECT FUNCTIONS
========================================= */

/**
 * Saves a new project document under the "projects" collection.
 */
export async function saveProject(formData) {
    if (!formData.projectName || !formData.description) {
        throw new Error("Missing required fields (Project Name and Description).");
    }

    const projectId = formData.projectName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-");

    const links = formData.availability === "public" ? {
        ...(formData.github ? { Github: formData.github.trim() } : {}),
        ...(formData.linkedin ? { LinkedIn: formData.linkedin.trim() } : {}),
        ...(formData.site ? { Site: formData.site.trim() } : {})
    } : null;

    const projectData = {
        title: formData.projectName.trim(),
        folderName: formData.projectName.trim().replace(/\s+/g, "_"),
        availability: formData.availability,
        links: Object.keys(links || {}).length > 0 ? links : null,
        tags: formData.tags
            ? formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
            : [],
        description: formData.description.trim(),
        createdAt: serverTimestamp()
    };

    await setDoc(doc(db, "projects", projectId), projectData);
    return projectId;
}

/* =========================================
   ABOUT & IDENTITY FUNCTIONS
========================================= */

/**
 * Saves or overwrites the main "About & Identity" content in Firestore.
 * Document Path: siteContent/about
 */
export async function saveAbout(aboutData) {
    if (!aboutData.realName || !aboutData.bioParagraph1) {
        throw new Error("Real Name and Bio Paragraph 1 are required.");
    }

    const payload = {
        realName: aboutData.realName.trim(),
        onlineIdentity: aboutData.onlineIdentity?.trim() || "",
        role: aboutData.role?.trim() || "",
        whatIDo: aboutData.whatIDo?.trim() || "",
        status: aboutData.status?.trim() || "",
        bioParagraph1: aboutData.bioParagraph1.trim(),
        bioParagraph2: aboutData.bioParagraph2?.trim() || "",
        updatedAt: serverTimestamp()
    };

    await setDoc(ABOUT_DOC_REF, payload);
}

/**
 * Fetches About & Identity content from Firestore.
 */
export async function getAbout() {
    const docSnap = await getDoc(ABOUT_DOC_REF);
    return docSnap.exists() ? docSnap.data() : null;
}

/* =========================================
   TECH STACK FUNCTIONS
========================================= */

/**
 * Saves or overwrites the Tech Stack array in Firestore.
 * Document Path: siteContent/techStack
 */
export async function saveTechStack(techStackArray) {
    if (!Array.isArray(techStackArray) || techStackArray.length === 0) {
        throw new Error("Tech stack must contain at least one row.");
    }

    const cleanedItems = techStackArray.map((item) => ({
        category: (item.category || "").trim(),
        description: (item.description || "").trim(),
        technologies: (item.technologies || "").trim()
    }));

    const payload = {
        items: cleanedItems,
        updatedAt: serverTimestamp()
    };

    await setDoc(TECH_STACK_DOC_REF, payload);
}

/**
 * Fetches Tech Stack data from Firestore.
 */
export async function getTechStack() {
    const docSnap = await getDoc(TECH_STACK_DOC_REF);
    return docSnap.exists() ? docSnap.data() : null;
}

/* =========================================
   RESUME & CONTACT FUNCTIONS
========================================= */

/**
 * Saves or overwrites Resume & Contact details in Firestore.
 * Document Path: siteContent/contact
 */
export async function saveContactInfo(contactData) {
    if (!contactData.resumeUrl || !contactData.email || !contactData.linkedinUrl) {
        throw new Error("Resume URL, Email, and LinkedIn profile URL are required.");
    }

    const payload = {
        resumeUrl: contactData.resumeUrl.trim(),
        email: contactData.email.trim(),
        linkedinUrl: contactData.linkedinUrl.trim(),
        updatedAt: serverTimestamp()
    };

    await setDoc(CONTACT_DOC_REF, payload);
}

/**
 * Fetches Resume & Contact information from Firestore.
 */
export async function getContactInfo() {
    const docSnap = await getDoc(CONTACT_DOC_REF);
    return docSnap.exists() ? docSnap.data() : null;
}