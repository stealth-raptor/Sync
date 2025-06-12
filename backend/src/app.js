import express from "express";
import {createServer} from "node:http";
import {Server} from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketmanager.js";

import userRoutes from "./routes/user.routes.js"

const app=express();
const server =createServer(app);
const io=connectToSocket(server);

app.set("port",(process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));

app.use("/api/v1/users",userRoutes);


const start=async()=>{
    const connectionDb=await mongoose.connect("mongodb+srv://aryansethi2311:zvMTcSuAgL6m6Gid@cluster0.bewcjse.mongodb.net/")
    console.log("mongo db connected");
    server.listen(app.get("port"),()=>{
        console.log("Listening on 8000");
    });
}

start();