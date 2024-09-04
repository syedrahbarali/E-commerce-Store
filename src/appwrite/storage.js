import { config } from "@/config/envExports";
import { Client, Databases, Storage, ID, Permission } from "appwrite";

const {
  appwriteURL,
  appwriteProjectID,
  appwriteDatabaseID,
  appwriteProductCollectionID,
  appwriteCategoryCollectionID,
  appwriteBucketID,
} = config;

export class StorageService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(appwriteURL).setProject(appwriteProjectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  addCategory = async ({ title, slug }) => {
    try {
      const newCategory = await this.databases.createDocument(
        appwriteDatabaseID,
        appwriteCategoryCollectionID,
        ID.unique(),
        {
          title,
          slug,
        }
      );

      if (newCategory.$id) {
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  getCategories = async () => {
    try {
      const categories = await this.databases.listDocuments(
        appwriteDatabaseID,
        appwriteCategoryCollectionID
      );
      return categories.documents;
    } catch (error) {
      return [];
    }
  };

  addProduct = async ({ title, desc, imageId }) => {
    try {
      const newProduct = await this.databases.createDocument(
        appwriteDatabaseID,
        appwriteProductCollectionID,
        ID.unique(),
        { title, desc, imageId }
      );

      console.log(newProduct);
      return newProduct;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // File Uploading
  uploadImage = async (file) => {
    try {
      const uploadedImage = await this.bucket.createFile(
        appwriteBucketID,
        ID.unique(),
        file
      );

      console.log("Uploaded Image", uploadedImage);
      return uploadedImage;
    } catch (error) {
      console.log(error);
    }
  };
}

const storageService = new StorageService();
export default storageService;
