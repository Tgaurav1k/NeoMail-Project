// const express = require('express');  old version

import express from 'express'; // react style
import dotenv from "dotenv";
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import userRoute from "./routes/user.route.js"
import emailRoute from "./routes/email.route.js"


dotenv.config({});
connectDB();
const PORT = 8080;  // port as random
const app = express();  // import app 

app.get("/", (req, res) => {
  res.send("✅ Backend is up and responding!");
});


// app.get("/home",(req,res)=>{
//     return res.status(200).json( {message:"  localhost:8080/home I am coming from backend", success:true} )
// })

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

// paste url for connection
// 🔥 Use this if you're always testing from localhost:5173 (React)
app.use(cors({
  origin: ["https://neo-mail-gauravkumar.vercel.app"],
  credentials: true,
}));

 // ← ← ← 🔥 THIS WAS MISSING

// routes 
app.use("/api/v1/user", userRoute);

// "http://localhost:8080/api/v1/user/register"
// "http://localhost:8080/api/v1/user/login"

app.use("/api/v1/email", emailRoute);

if (process.env.NODE_ENV !== "production") {

  app.listen(PORT, "0.0.0.0", ()=>{
    console.log(`
        localhost:8080/home
        Server running at port ${PORT}`);
});
}
export default app;