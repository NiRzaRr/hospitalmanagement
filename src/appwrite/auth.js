import { Client, Account } from "appwrite";
import config from "../config/config";
 
export class Auth {
    client = new Client();
    account;

    constructor() {
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async addminLogin({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }
    async getAdmin() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
    }
    async logoutAdmin(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const auth = new Auth()
export default auth;