import mongoose from "mongoose";

const Schema = mongoose.Schema({
    user:{
        type:String,
        index:true,
    },
    ttl:Number,
    token:String
})

const session = mongoose.model("Session", Schema)
export default session;