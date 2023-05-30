import express from "express";
import mongoose from "mongoose";
import shoppingRoute from "./routes/shoppingRoute.js"

let app = express();
app.use(express.json())

const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

let port = process.env.PORT || 3001

const url = `mongodb+srv://${mongo_user}:${mongo_password}@${mongo_url}/shoppingdatabase?retryWrites=true&w=majority`

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(url);
        console.log("Connected to MongoDB on: "+conn.connection.host);
    } catch (error){
        console.log(error);
        process.exit(1);
    }
}

app.use("/api", shoppingRoute);

connectDB().then(() => {
    app.listen(port, () => {
        console.log("Server running in port "+port)
    })
})