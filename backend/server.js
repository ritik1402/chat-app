import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http'
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes.js"

// Load env variables
dotenv.config();
const app = express();
//middle ware
app.use(cors());
app.use(express.json());


//connect mongodb
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("Mongodb Connected")
})
.catch((err)=> {
    console.log("can not connect to mongodb",err);
});





//use routes
app.use("/api/auth",authRoutes);

const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: "*",
        method:["GET","POST"],

    },
});

//middle ware
// app.use(cors());
// app.use(express.json());

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
