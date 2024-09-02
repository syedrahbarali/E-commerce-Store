import { config } from "@/config/envExports";
import { Client, Account, ID } from "appwrite";

const { appwriteURL, appwriteProjectID } = config;

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(appwriteURL).setProject(appwriteProjectID);
    this.account = new Account(this.client);
  }

  createAccount = async ({ email, password, name, phone }) => {
    try {
      const newAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
        phone
      );

      if (newAccount) {
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  login = async ({ email, password }) => {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      return { error: error.message };
    }
  };

  getCurrentUser = async () => {
    try {
      return await this.account.get();
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
