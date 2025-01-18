 import Routes from "express";
import { UserRegister } from "../controllers/user.controller.js";
import {upload} from '../middleware/upload.middleware.js'

const routes= Routes();

routes.route("/register").post(
    upload.fields(
        [
    {
        name:"avatar",
        maxCount:1

    },
    {
       name:"coverImage",
       maxCount:1
    }

        ]),
    UserRegister
);


// to handle the file

 export default routes