const config = {
    appwriteUrl: import.meta.env.VITE_APPWRITE_URL,
    appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    appwriteDatabaseID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    appwriteCollectionID: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
    appwriteVisitCollectionID: import.meta.env.VITE_APPWRITE_VISIT_COLLECTION_ID,
}

export default config;