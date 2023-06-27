import mongoose from "mongoose";

const questionSchema = mongoose.Schema ({
    title : {type:String, required:true},
    body : {type:String, required:true},
    tags : {type:[String], required:true},
    upVotes : {type:[String], default:[]},
    downVotes : {type:[String], default:[]},
    noOfAnswers : {type:Number, default:0},
    askedOn : {type:Date, default:Date.now},
    userPosted : {type:String,required:true},
    userId : {type:String},
    answers : [{
        answerBody:{type:String},
        userAnswered:{type:String},
        answeredOn:{type:Date, default:Date.now},
        userId:{type:String}
    }]
})

export default mongoose.model("Questions", questionSchema);