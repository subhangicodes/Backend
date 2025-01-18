import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {User} from "../models/user.models.js";
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import { ApiResponse } from "../utils/ApiResponse.js";

const UserRegister = asyncHandler ( async (req,res)=>{
    // steps for registeration or user register like we have to check or give responses ...
    //  1. Get user detail from frontend like name, password , image, avtar, email etc..
    //  2. Validate that all fields are filled - not empty..
    //  3. Check that user already exists using email or username..
    //  4. Check for image and avtar if it is come or not..
    //  5. Upload them to cloudinary , avtar and image..
    //  6. Create User object - create entries in db..  we created on user object where all the user details are stored..
    //  7. Remove password and refresh token field from response..    as we know that when data will come from db then it shows password also so we have to remove the password
    //  8. Check for User Creation..
    //  9. Return res..

    const {Fname,Lname,Email, Password} = req.body;
    console.log("Email:",Email)                      // here we are handleing one data 

    if(
        [Fname,Lname,Email,Password].some((field)=>    // here we handle that all the fields are required it should be filled  with all the details
            field?.trim() === "" )
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({                // user with this fname or email are exists if yes then throw the error
        $or : [{Fname} , {Email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with email or usename already exists")
    }
    console.log('Avatar:', req.files?.avatar?.[0]?.path);
                                                        // here avtar is nothing but files
    const avatarLocalpath =req.files?.avatar?.[0]?.path;
    const  coverImageLocalPath = req.files?.coverImage[0]?.path;  
    
    if (avatarLocalpath === undefined || avatarLocalpath === null || avatarLocalpath === "") {
        throw new ApiError(400, "Avatar file is required!");
    }
    
    console.log("Avatar Path Passed Validation:", avatarLocalpath);
    // here we take 0 beacuse we want first property or the path which is uploaded by the multer 

    if(!avatarLocalpath){
        throw new ApiError(400,"Avatar file is required!!")
    }

    // upload in cloudnary 
 const avatar = await uploadOnCloudinary(avatarLocalpath)
 const coverImage = await uploadOnCloudinary(coverImageLocalPath);

 if(!avatar){
    throw new ApiError(400,"Avatar file is required!")
 }

 // here we are created object

 const createdAt = new Date();
 const updatedAt = new Date();
 const watchHistory = [];

const user=await User.create({
    UserId,
    Fname,
    Lname,
    Email,
    Password,
    createdAt,
    updatedAt,
    watchHistory,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
 })

 
   // here we check that our user is created or it reaturn empty
   // here we are using select method to select that thing which is required 
   const createdUser = await User.findById(user._id).select(
    "-password"
   )

   if(!createdUser){
    throw new ApiError(500,"Something went wrong registering the user")
   }


return res.status(200).json(
    new ApiResponse(201,createdUser,"User registered successfully")
)

});
export {UserRegister}
 
// req.body bydefault gives us the access  by express
// req.files bydefault gives us  the access by multer





