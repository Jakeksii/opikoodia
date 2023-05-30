import express from "express";
import itemModel from "../models/item.js";

let router = express.Router();

router.get("/shopping", async (req, res) => {
    try {
        const items = await itemModel.find();
        return res.status(200).json(items);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" + error.message })
    }
})

router.post("/shopping", async (req, res) => {
    try {
        if(!req.body.type || 
            !req.body.count || 
            !req.body.price){
                return res.status(400).json({ message: "Bad request" })
            }
        
        const {type, count, price} = req.body
        const item = new itemModel({type, count, price})
        await item.save()
        return res.status(201).json(item)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error. " + error.message })
    }
})

router.delete("/shopping/:id", async (req, res) => {
    try {
        let stat = await itemModel.deleteOne({"_id":req.params.id})
        return res.status(200).json(stat)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error. " + error.message })
    }
})

router.put("/shopping/:id", async (req, res) => {
    if(!req.body.type || 
        !req.body.count || 
        !req.body.price){
            return res.status(400).json({ message: "Bad request" })
        }

    try {
        const {type, count, price} = req.body
        const stat = await itemModel.replaceOne({"_id":req.params.id}, {type, count, price})
        return res.status(201).json(stat)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error. " + error.message })
    }
})

export default router;