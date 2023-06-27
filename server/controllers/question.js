import mongoose from "mongoose";
import Questions from '../models/question.js';

export const askQuestion = async (req,res) => {
    const postQuestionData= req.body;
    const postQuestion = new Questions({...postQuestionData});
    try {
        await postQuestion.save();
        const questionList= Questions.find();
        res.status(200).json(questionList);
    } catch (error) {
        console.log(error);
        res.status(409).json("Couldn't post a new question");
    }
}

export const fetchAllQuestions = async(req,res) => {
    try {
        const questionList =await Questions.find();
        res.status(200).json(questionList);
    } catch (error) {
        res.status(400).json("Something went wrong");
    } 
}

export const deleteQuestion = async (req,res) => {
    const {id:_id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).send("Question unavailable...");
    }
    try {
        await Questions.findByIdAndRemove(_id);
        res.status(200).json("Question successfully deleted");
    } catch (error) {
        console.log(error);
        res.status(404).json("Something went wrong");
    }
}

export const handleVotes = async(req,res) => {
    const {id:_id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).send("Question unavailable...");
    }
    const {value, userId} = req.body;
    try {
        const question = await Questions.findById(_id);
        const upIndex = question.upVotes.findIndex((id) => id === String(userId));
        const downIndex= question.downVotes.findIndex((id) => id===String(userId));
        if(value == 'upVote'){
            if(downIndex !== -1){
                question.downVotes= question.downVotes.filter((id) => id!==String(userId));
            }
            if(upIndex === -1){
                question.upVotes.push(userId);
            }
            else{
                question.upVotes= question.upVotes.filter((id) => id!==String(userId));
            }
        }
        else if(value == 'downVote'){
            if(upIndex !== -1){
                question.upVotes= question.upVotes.filter((id) => id!==String(userId));
            }
            if(downIndex === -1){
                question.downVotes.push(userId);
            }
            else{
                question.downVotes= question.downVotes.filter((id) => id!==String(userId));
            }
        }
        await Questions.findByIdAndUpdate(_id,question);
        res.status(200).json("Successfully voted");
    } catch (error) {
        res.status(400).json("Something went wrong");
    }
}