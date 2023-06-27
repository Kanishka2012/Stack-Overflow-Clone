import mongoose from "mongoose";
import Questions from '../models/question.js';

export const postAnswer = async(req,res) => {
    const { id: _id } = req.params;
    const { answerBody, userAnswered, userId, noOfAnswers} = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
       console.log("Hello");
       return res.status(404).send("Question not found");
    }
    updateAnswers(noOfAnswers,_id);
    try {
       const updatedQuestion = await Questions.findByIdAndUpdate(_id, {$addToSet : {answers : [{answerBody,userAnswered,userId}]}});
       res.status(200).json(updatedQuestion);
    } catch (error) {
        console.log(error);
        res.status(404).json("Something went wrong");
    }
}

const updateAnswers = async(noOfAnswers,_id) => {
    try {
       await Questions.findByIdAndUpdate(_id, {$set : {noOfAnswers:noOfAnswers}})
    } catch (error) {
        console.log(error);
    }
}

export const deleteAnswer = async(req,res) => {
    const {id:_id}= req.params;
    const {noOfAnswers,answerId} = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        res.status(404).send("Question Unavailable ...");
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        res.status(404).send("Answer Unavailable ...");
    }
    updateAnswers(noOfAnswers,_id);
    try {
        await Questions.updateOne({_id}, {$pull :{answers:{_id:answerId}}});
        res.status(200).json({message:"Successfully deleted the answer"})
    } catch (error) {
        console.log(error);
        res.status(400).json("Something went wrong...")
    }
}