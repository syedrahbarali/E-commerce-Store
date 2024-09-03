import { config } from "@/config/envExports";
import { Client, Account, Databases, ID, Query } from "appwrite";

const {
  appwriteURL,
  appwriteProjectID,
  appwriteDatabaseID,
  appwriteUserCollectionID,
} = config;

export class AuthService {
  client = new Client();
  account;
  databases;

  constructor() {
    this.client.setEndpoint(appwriteURL).setProject(appwriteProjectID);
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
  }

  createAccount = async ({ email, password, name, phone, role = "user" }) => {
    try {
      const newAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (newAccount) {
        const response = await this.databases.createDocument(
          appwriteDatabaseID,
          appwriteUserCollectionID,
          ID.unique(),
          {
            phone,
            role,
            userId: newAccount.$id,
          }
        );

        if (response) {
          return true;
        }
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  login = async ({ email, password }) => {
    try {
      const user = await this.account.createEmailPasswordSession(
        email,
        password
      );

      if (user?.$id) {
        const userInfo = await this.databases.listDocuments(
          appwriteDatabaseID,
          appwriteUserCollectionID,
          [Query.equal("userId", user.userId)]
        );

        if (userInfo) {
          const { name, role } = userInfo.documents[0];
          user.name = name;
          user.role = role;
          return user;
        }
      }
    } catch (error) {
      return { error: error.message };
    }
  };

  getCurrentUser = async () => {
    try {
      const user = await this.account.get();
      console.log(user);

      if (user?.$id) {
        const userInfo = await this.databases.listDocuments(
          appwriteDatabaseID,
          appwriteUserCollectionID,
          [Query.equal("userId", user.$id)]
        );

        if (userInfo) {
          const { name, role } = userInfo.documents[0];
          user.name = name;
          user.role = role;
          return user;
        }
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  logout = async () => {
    try {
      const response = await this.account.deleteSessions();

      if (response) {
        return true;
      }
    } catch (error) {
      return error.message;
    }
  };
}

const authService = new AuthService();
export default authService;
