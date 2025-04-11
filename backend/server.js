import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http'
import { Server } from 'socket.io';
import dotenv from 'dotenv';


// Load env variables
dotenv.config();
const app = express();


const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: "*",
        method:["GET","POST"],

    },
});

//middle ware
app.use(cors());
app.use(express.json());

//Routes
app.get("/",(req,res)=>{
    res.send("Backend is running...");
});


// Socket.io events
io.on("connection", (socket) => {
    console.log("🟢 New client connected:", socket.id);
  
    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });
  
// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>{
    console.log(`server is running on port:  ${PORT}`);
});
