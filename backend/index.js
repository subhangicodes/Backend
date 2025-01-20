import mongoose from "mongoose";
import dotenv from "dotenv"
import connectDB from "./db/dbConnection.js";
import { DB_NAME } from "./constants.js";
import {app} from './app.js';

dotenv.config();


connectDB()
.then(()=>{
    app.on("error",(error)=>{
      console.log("Error",error)
      throw error
})
    app.listen(process.env.PORT,()=>{
       console.log(`Server is running at port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log(`MongoDb connection failed !!`,err)
})
