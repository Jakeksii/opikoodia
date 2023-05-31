import mongoose from "mongoose";

const Schema = mongoose.Schema({
    username:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        minlenght: 5,
        required: true
    }
})

const user = mongoose.model("User", Schema)
export default user;