import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import 'dotenv/config.js'
import jwt from "jsonwebtoken";


/***********************Creating JWT Token***************************/

const createToken =(_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:"10d"});
};

/***********************Register user***************************/
const registerUser = async (req,res)=>{

    // Grab data from the register form
    const {email,password} = req.body;

    // Validate if fields are empty
    if(!email||!password){
        res.status(400).json({error:"All fields are required"});
    }
    // Check if emial already exists
    const exist = await User.findOne({email});
    if(exist){
        return res.status(400).json({error:"Email is already taken"})
    }
    // Hash the password
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password,salt)
    try{
        // Register user
        const user = await User.create({email,password:hashedPassword})
        // Creating JSONWebtoken
        const token = createToken(user._id)
        // sending respone
        res.status(200).json({email,token});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}

/***********************Login user***************************/
const loginUser = async (req,res)=>{
    
    const {email,password} = req.body;

    // Validate if fields are empty
    if(!email||!password){
        res.status(400).json({error:"All fields are required"});
    }
    // Check if emial already exists
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({error:"Incorrect email"})
    }
    // Check password
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        return res.status(400).json({error:"Incorrect password"});
    }

    try{
        // Creating JSONWebtoken
        const token = createToken(user._id)
        // sending respone
        
        res.status(200).json({email,token,message:"You have logged in succesfully"})
    }catch(error){
        res.status(500).json({error:error.message})
    }
};

export {registerUser,loginUser}