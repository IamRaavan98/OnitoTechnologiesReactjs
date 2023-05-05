const express = require("express");
const { register, getAllData } = require("../controllers/user");
const userRoutes = express.Router();


userRoutes.get("/",(req,res)=>{
    res.status(200).send("welcome to the user routes")
})


userRoutes.post("/register",register);
userRoutes.get("/getAllData",getAllData);


module.exports = userRoutes
