import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv'

import userRoutes from "./routes/users.js";
import questionRoutes from './routes/question.js';
import answerRoutes from './routes/answer.js'

const app = express();
dotenv.config();
app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.get("/",(req,res)=>{
    res.send("This is a stack overflow clone");
})

app.use("/user",userRoutes);
app.use('/question',questionRoutes);
app.use('/answer',answerRoutes)

const PORT=process.env.PORT || 5000;

const DATABASE_URL=process.env.CONNECTION_URL;

mongoose.connect(DATABASE_URL)
  .then(app.listen(PORT,()=> console.log(`Server listening on port ${PORT}`)))
  .catch((err) => console.log(err.message));