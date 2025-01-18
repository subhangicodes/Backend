import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB =async()  =>{
try{
 const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`);
 console.log(`\n MongoDB connected! DB Host ${connectionInstance.connection.host}`)     // conection host we are taking as to connect our mongodbs whole url it is use to connect with write database
}
catch(error){
   console.log("MongiDB connection error",error);
   process.exit(1)         // process is the part of node.js ,process is like our current application is running somewhere so it is the reference of that it.
}
}
export default connectDB;