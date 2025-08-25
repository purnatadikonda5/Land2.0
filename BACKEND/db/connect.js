import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function connect(){
    console.log(process.env.MongoURI);
    mongoose.connect(process.env.MongoURI).then(()=>{
        console.log("connected to mongodb successfully");
    }).catch(e=>console.log("error :",e));
} 