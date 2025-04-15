import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from '../models/User.js';

const router = express.Router();

//Register Route
router.post("/register", async (req,res)=>{
    const {username,email,password}= req.body;

    try{
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(400).json({message: "User already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({username,email,password:hashedPassword});
        await newUser.save();

        res.status(201).json({message:"User Registered Succesfully"});
    
    }
    catch (err){
        res.status(500).json({message:"Server Error"})
    }

});

//Login Routes
router.post("/login",async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if (!user) return res.status(404).json({message: "Invalid email or password"})

        const isMatch  = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message:"Invalid email or password"});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn:"3d"});    

        res.status(200).json({token, user:{id:user._id, username: user.username}})
    }
    catch(err){
        res.status(500).json({error: "Server Error"});
    }
})

export default router;