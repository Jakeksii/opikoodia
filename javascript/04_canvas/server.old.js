const express = require("express");

let app = express();
app.use(express.json());

const port = 3000

app.post("/login", function(req, res){
    //console.log(req);
    let user = {
        "username":req.body.username,
        "password":req.body.password
    }
    console.log("User", user);
    if(user.username === "admin" && user.password === "pass"){
        return res.status(200).json({"message":"logged in"});
    } else{
        return res.status(401).json({"message":"unauthorized"});
    }
})

app.use("/", express.static("public"));

app.listen(port)

console.log("Running in port " + port);