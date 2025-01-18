import mongoose  from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const PostSchema= new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        content:{
            type:String,
            required:true,
        },
        vote:{
            type:Number,
            enum:[1,-1],
            required:true
        },
        createdAt:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        createdby:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User",

        },
        other:{
            updated:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
            },
            deleted:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
            }
        },
        description:{
            type:String,
            required:true,
        },
        duration:{
            type:Number,
            required:true,
        },
        views:{
            type:Number,
            default:0
        },
        isPublished:{
            type:Boolean,
            default:true

        }

    },
    
    {timestamps:true})

    PostSchema.plugin(mongooseAggregatePaginate)

export const Post = mongoose.model("Post",PostSchema)