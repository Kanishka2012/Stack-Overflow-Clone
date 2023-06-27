import express from 'express';
import { auth } from '../middlewares/auth.js';
import {askQuestion,fetchAllQuestions,deleteQuestion, handleVotes} from '../controllers/question.js'

const router = express.Router();

router.post('/askQuestion',auth, askQuestion);
router.get('/get',fetchAllQuestions);
router.delete('/delete/:id',auth, deleteQuestion);
router.patch('/vote/:id', auth, handleVotes);

export default router;