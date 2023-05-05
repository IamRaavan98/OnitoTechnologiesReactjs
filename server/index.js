require("dotenv").config();
const express = require("express")
const app = express();
const mongoose = require("mongoose")
const DBconnection = require("./config/DB");
const cors = require("cors");
const userRoutes = require("./routes/user");


// middleware
app.use(express.json())


//dbconnection
DBconnection();

// cors
app.use(cors({
    origin:process.env.REACT_APP_FRONTEND_URL,
    credentials: true,
}));


// Routes
app.use("/api",userRoutes)



//server listen@
app.listen(process.env.PORT,()=>{
    console.log("Server is running",process.env.PORT)
  })
  
  
