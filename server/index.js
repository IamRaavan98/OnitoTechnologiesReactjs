require("dotenv").config();
const express = require("express")
const app = express();
const mongoose = require("mongoose")
const DBconnection = require("./config/DB");
const cors = require("cors");
const userRoutes = require("./routes/user");
const path = require('path');
// middleware
app.use(express.json())


//dbconnection
DBconnection();

// cors
// app.use(cors({
//     origin:process.env.REACT_APP_FRONTEND_URL,
//     credentials: true,
// }));

// Routes
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api",userRoutes)

  // Serve the React app for all other requests
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  


app.use(express.urlencoded({ extended: true }));


//server listen@
app.listen(process.env.PORT,()=>{
    console.log("Server is running",process.env.PORT)
  })
  
  
