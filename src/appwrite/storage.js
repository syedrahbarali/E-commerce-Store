import { config } from "@/config/envExports";
import { Client, Databases, Storage, ID, Query } from "appwrite";
import { useId } from "react";

const {
  appwriteURL,
  appwriteProjectID,
  appwriteDatabaseID,
  appwriteProductCollectionID,
  appwriteCategoryCollectionID,
  appwriteCartCollectionID,
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

  addProduct = async ({ title, desc, price, quantity, imageId }) => {
    try {
      const newProduct = await this.databases.createDocument(
        appwriteDatabaseID,
        appwriteProductCollectionID,
        ID.unique(),
        {
          title,
          desc,
          price: parseFloat(price),
          quantity: parseInt(quantity),
          imageId,
        }
      );

      console.log(newProduct);
      return newProduct;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  getProducts = async () => {
    try {
      return await this.databases.listDocuments(
        appwriteDatabaseID,
        appwriteProductCollectionID
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  getProduct = async (productId) => {
    try {
      return await this.databases.getDocument(
        appwriteDatabaseID,
        appwriteProductCollectionID,
        productId
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  updateProduct = async (
    productId,
    { title, desc, price, quantity, imageId }
  ) => {
    try {
      const updatedProduct = await this.databases.updateDocument(
        appwriteDatabaseID,
        appwriteProductCollectionID,
        productId,
        {
          title,
          desc,
          price: parseFloat(price),
          quantity: parseInt(quantity),
          imageId,
        }
      );

      if (updatedProduct) {
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  deleteProduct = async ({ $id, imageId }) => {
    try {
      // const deletedImage = await this.bucket.deleteFile(
      //   appwriteBucketID,
      //   imageId
      // );

      const deletedImage = await this.deleteFile(imageId);

      if (deletedImage) {
        return await this.databases.deleteDocument(
          appwriteDatabaseID,
          appwriteProductCollectionID,
          $id
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Cart Functionality

  addToCart = async ({ userId, productId, quantity = 1 }) => {
    try {
      const existingItem = await this.databases.listDocuments(
        appwriteDatabaseID,
        appwriteCartCollectionID,
        [Query.equal("userId", userId), Query.equal("productId", productId)]
      );

      if (existingItem.documents[0]?.$id) {
        await this.databases.updateDocument(
          appwriteDatabaseID,
          appwriteCartCollectionID,
          existingItem.documents[0]?.$id,
          {
            quantity:
              parseInt(existingItem.documents[0].quantity) + parseInt(quantity),
          }
        );
        return true;
      } else {
        const addedItem = await this.databases.createDocument(
          appwriteDatabaseID,
          appwriteCartCollectionID,
          ID.unique(),
          {
            userId,
            productId,
            quantity: parseInt(quantity),
          }
        );

        if (addedItem.$id) {
          return true;
        }
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  getCartItems = async (userId) => {
    try {
      const cart = await this.databases.listDocuments(
        appwriteDatabaseID,
        appwriteCartCollectionID,
        [Query.equal("userId", userId)]
      );
      return cart;
    } catch (error) {
      // console.log(error);
      return [];
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

  getImagePreview = (fileId) => {
    try {
      return this.bucket.getFilePreview(appwriteBucketID, fileId);
    } catch (error) {
      console.log(error);
    }
  };

  deleteFile = async (fileId) => {
    try {
      const deletedImage = await this.bucket.deleteFile(
        appwriteBucketID,
        fileId
      );

      if (deletedImage) {
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
}

const storageService = new StorageService();
export default storageService;
