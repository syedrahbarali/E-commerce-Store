export const config = {
  appwriteURL: import.meta.env.VITE_APPWRITE_URL,
  appwriteProjectID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  appwriteDatabaseID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  appwriteProductCollectionID: import.meta.env
    .VITE_APPWRITE_PRODUCT_COLLECTION_ID,
  appwriteUserCollectionID: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
  appwriteBucketID: import.meta.env.VITE_APPWRITE_BUCKET_ID,
};
