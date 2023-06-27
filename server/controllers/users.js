import mongoose from 'mongoose';
import User from '../models/auth.js';

export const getAllUsers = async(req,res) =>{
    try {
        const users=await User.find();
        const allUsers=[];
        users.forEach(user => {
            allUsers.push({
                _id:user._id,
                name:user.name,
                about:user.about,
                tags:user.tags,
                joinedOn:user.joinedOn});
        })
        // console.log(allUsers);
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(404).json("Something went wrong ....")
    }
}

export const updateUser = async(req,res)=>{
    const {id:_id} = req.params;
    const {name,about,tags} = req.body;
    // console.log(req.body);
    if(!mongoose.Types.ObjectId.isValid(_id)){
        res.status(404).json("Question unavailable..");
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            { $set: { name: name, about: about, tags: tags } },
            { new: true }
          );
        // console.log(updatedUser);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}