import { Client, Databases, ID } from "appwrite";
import config from "../config/config";

export class Service {
    client = new Client();
    databases;
    constructor() {
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async addPatient({name, age, gender, mobile, disease, doctor, fees, medicine, date, visit}){
         try {
            return await this.databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                ID.unique(),
                {
                    name,
                    age,
                    gender, 
                    mobile: Number(mobile), 
                    disease, 
                    doctor, 
                    fees: Number(fees), 
                    medicine, 
                    date : new Date(date),
                }
            );
         } catch (error) {
            console.log(error);
         }
    }
    async addVisit({date, disease, doctor, fees, medicine, userId}){
        try {
            return await this.databases.createDocument( 
                config.appwriteDatabaseID,
                config.appwriteVisitCollectionID,
                ID.unique(),
                {
                    disease, 
                    doctor, 
                    fees : Number(fees), 
                    medicine, 
                    date : new Date(date),
                    userId
                })
        } catch (error) {
            console.log(error);
        }
    }
    async updateInfo(patientId, {name, age, gender, mobile, disease, doctor, fees, medicine, date}){
        try {
           return await this.databases.updateDocument(
            config.appwriteDatabaseID,
            config.appwriteCollectionID,
            patientId,
            {
                name,
                age,
                gender, 
                mobile: Number(mobile), 
                disease, 
                doctor, 
                fees: Number(fees), 
                medicine, 
                date : new Date(date),
           }
           )   
        } catch (error) {
            console.log(error);
        }
    }
    async deleteInfo(patientId){
        try {
            return await this.databases.deleteDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                patientId, 
            )
        } catch (error) {
            console.log(error);
        }
    }
    async getAllInfo({query}){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                query
            )
        } catch (error) {
            console.log(error);
        }
    }
    async getInfo(patientId){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                patientId,
            )
            
        } catch (error) {
            console.log(error);
        }
    }
    async getVisit(patientId){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseID,
                config.appwriteVisitCollectionID,
                patientId,
            )
            
        } catch (error) {
            console.log(error);
        }
    }
    async getVisitList(queries){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteVisitCollectionID,
                queries
            )
        } catch (error) {
            console.log(error);
        }
    }
    async updateVisit(patientId, {date, disease, doctor, fees, medicine}){
        try {
            return await this.databases.updateDocument( 
                config.appwriteDatabaseID,
                config.appwriteVisitCollectionID,
                patientId,    
                {
                    disease, 
                    doctor, 
                    fees : Number(fees), 
                    medicine, 
                    date : new Date(date),
                })
        } catch (error) {
            console.log(error);
        }
    }
    async deleteVisit(patientId){
        try {
            return await this.databases.deleteDocument(
                config.appwriteDatabaseID,
                config.appwriteVisitCollectionID,
                patientId, 
            )
        } catch (error) {
            console.log(error);
        }
    }
}

const service = new Service()
export default service;