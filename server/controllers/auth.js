import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import users from "../models/auth.js";

export const signup = async(req,res) => {
    const {name,email,password}=req.body;
    console.log(req.body);
    try {
        const isExistingUser=await users.findOne({ email});
        if(isExistingUser){
            console.log("hello world");
            // alert("Email already exists. Please log in");
           return res.status(404).json({message : "User already exists. Please log in."});
           
        }
        const hashPassword=await bcrypt.hash(password,14);
        console.log(hashPassword)
        const newUser = await users.create({name:name, email:email, password:hashPassword});
        const token = jwt.sign({email:newUser.email, id:newUser._id}, process.env.JWT_SECRET,{expiresIn:"1h"});
        res.status(200).json({result:newUser,token});
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong...");
    }
}

export const login = async(req,res) => {
    const {email, password} = req.body;
    // console.log(req.body);
    try {
        const existingUser=await users.findOne({ email});
        if(!existingUser){
           return res.status(404).json({message : "Email does not exist. Please sing up first"});
        }
        const isPasswordcrt=await bcrypt.compare(password,existingUser.password);
        if(!isPasswordcrt){
           return res.staus(400).json({message : "Password not correct. Please try again"});
        }
        const token = jwt.sign({email:existingUser.email, id: existingUser._id},process.env.JWT_SECRET, {expiresIn:"1h"})
        res.status(200).json({result:existingUser,token});

    } catch (error) {
        // console.log(error.response.data)
        res.status(500).json("Something went wrong");
    }
}
