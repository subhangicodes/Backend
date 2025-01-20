import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app=express();


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
import userRoutes from './routes/user.routes.js'

//Routes declaration     
app.use("/api/v1/users",userRoutes)    //  we use app.get when we call any route but here we decalre the routes in a particular file so have to call the middleware to call the routes 
                                       // here we are using /api/v1 beacuse its a standard practice that that shows the version 
export {app}