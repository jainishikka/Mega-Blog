import conf from "../conf/conf";
import {Client, Databases,Storage,Query, ID} from "appwrite";

export class Service{
    client=new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
    this.databases=new Databases(this.client);
    this.bucket=new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(conf.appwriteDataBaseId,conf.appwriteCollectionId,slug,
                {title, content,featuredImage,status,userId}
            )
        } catch (error) {
            console.log("Error in createPost<config.js",error);
            
        }
    }

    async updatePost(slug, {title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(conf.appwriteDataBaseId,conf.appwriteCollectionId,slug,
                {title,content,featuredImage,status})
        } catch (error) {
            console.log("Error in updatePost<config.js",error);
        }
    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(conf.appwriteDataBaseId,conf.appwriteCollectionId,slug);
             return true;
        } catch (error) {
            console.log("Error in deletePost<config.js",error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appwriteDataBaseId,conf.appwriteCollectionId,slug)
        } catch (error) {
            console.log("Error in getPost<config.js",error);
            return false;
        }
    }

    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(conf.appwriteDataBaseId,conf.appwriteCollectionId,queries);
        } catch (error) {
            console.log("Error in listPost<config.js",error);
            return false;
        }
    }

    //file upload service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(conf.appwriteBucketId,ID.unique(),file);
        } catch (error) {
            console.log("Error in uploadFile<config.js",error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId,fileId);
            return true
        } catch (error) {
            console.log("Error in deleteFile<config.js",error);
            return false
        }
    }

    getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(conf.appwriteBucketId,fileId)
        } catch (error) {
            console.log("Error in getFilePreview<config.js",error);
            return false;
        }
    } 
}

const service=new Service();
export default service;