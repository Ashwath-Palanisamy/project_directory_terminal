import { db } from "../config/firebase";
import { 
    doc, 
    getDoc, 
    setDoc, 
    serverTimestamp, 
    collection, 
    getDocs, 
    query, 
    orderBy 
} from "firebase/firestore";


export async function getProjects() {
    try {
        const projectsRef = collection(db, "projects");
        const q = query(projectsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const projects = [];
        querySnapshot.forEach((docSnap) => {
            projects.push({
                id: docSnap.id,
                ...docSnap.data()
            });
        });

        return projects;
    } catch (error) {
        console.error("Error fetching projects from Firestore:", error);
        throw error;
    }
}

/**
 * Fetches a single project document by its custom document ID slug.
 * @param {string} projectId Custom ID slug (e.g., "my-first-project")
 * @returns {Promise<Object|null>} Project object or null if non-existent
 */
export async function getProjectById(projectId) {
    if (!projectId) return null;

    try {
        const docRef = doc(db, "projects", projectId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data()
            };
        }

        return null;
    } catch (error) {
        console.error(`Error fetching project ${projectId}:`, error);
        throw error;
    }
}


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