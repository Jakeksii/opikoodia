const express = require("express");

const PORT = 3000;

let app = express();

app.use(express.json());
app.use("/", express.static("public"));


//DATABASE
let database = [];
let id = 100;

/* contact obj
    firstname:string,
    lastname:string,
    email:string,
    phone:string,
    id:number
*/

//REST API

/*
CREATE - POST "/api/contact"
READ - GET "/api/contact"
UPDATE - PUT "/api/contact:id"
DELETE - DELETE "/api/contact/:id"
*/

/*
Here is a simple description of all: 
POST is always for creating a resource 
( does not matter if it was duplicated ) 
PUT is for checking if resource exists then update, else create new resource. 
PATCH is always for updating a resource.
*/

app.get("/api/contact",function(req,res){
    return res.status(200).json(database);
})

app.post("/api/contact", function(req,res){
    let contact = {
        id:id,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        phone:req.body.phone
    }
    id++;
    database.push(contact);
    return res.status(201).json(contact);
})

app.delete("/api/contact/:id", function(req,res){
    let tempId = parseInt(req.params.id);
    database = database.filter(contact => contact.id !== tempId);
    return res.status(200).json({"message":"success"});
})

app.put("/api/contact/:id", function(req,res){
    let tempId = parseInt(req.params.id);
    let contact = {
        id:tempId,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        phone:req.body.phone
    }
    for(let i=0; i<database.length; i++){
        if(tempId === database[i].id) {
            database.splice(i,1,contact);
            return res.status(200).json({"message":"success"});
        }
    }
    return res.status(404).json({"message":"not found"});
})

app.listen(PORT);
console.log("Running in port " + PORT);