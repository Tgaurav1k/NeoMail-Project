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
const PORT = process.env.PORT || 8080;
const app = express();  // import app 

app.get("/", (req, res) => {
  res.send("✅ Backend is up and responding!");
});


// app.get("/home",(req,res)=>{
//     return res.status(200).json( {message:"  localhost:8080/home I am coming from backend", success:true} )
// })

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// CORS configuration - supports both development and production
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    process.env.FRONTEND_URL
].filter(Boolean); // Remove undefined values

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));

// routes 
app.use("/api/v1/user", userRoute);

// "http://localhost:8080/api/v1/user/register"
// "http://localhost:8080/api/v1/user/login"

app.use("/api/v1/email", emailRoute);


// Only start server if not running in a serverless environment (like Vercel)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`
        localhost:${PORT}/home
        Server running at port ${PORT}`);
  });
}

export default app;
