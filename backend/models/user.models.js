import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        UserId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'User',
         required:true,
         index:true                 // when we want to search anything index:true help us to find that name so we are using this
        },
        Fname:{
          type:String,
          required:true,
          
        },
        Lname:{
            type:String,
            required:true,
        },
        Email:{
           type:String,
           required:true,
           lowercase:true,
           index:true
        },
        Password:{
           type:String,        // password is string beacuse safety purpose so we can encrypt our password 
           required:[true,"Password is required"]
        },
        createdAt:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        updatedAt:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        avatar:{
            type:String,
            required:true
        },
        coverImage:{
             type:String,
        },
        watchHistory:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Post"
            }
        ]

    },{timestamps:true}
);

UserSchema.pre( "save",async function (next){
  if(!this.isModified("password")) return next();

  this.password= await bcrypt.hash(this.password,10)
  next();
})

UserSchema.methods.isPasswordCorrect = async function (password){
   return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateAccessToken = async function (){
 return  jwt.sign(
    {
        UserId:this._id,
        Fname:this.fname,
        email:this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expireIn:process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}
UserSchema.methods.generateRefreshToken = function (){
    return  jwt.sign(
        {
            UserId:this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expireIn:process.env.REFRESH_TOKEN_EXPIRY
        }
      )
}

export const User=mongoose.model("User",UserSchema)