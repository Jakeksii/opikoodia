import mongoose from "mongoose";


let Schema = mongoose.Schema({
    user: {
        type:String, 
        index:true,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required:true
    }
}, {timestamps: true})

const itemModel = mongoose.model("Item", Schema);
export default itemModel;