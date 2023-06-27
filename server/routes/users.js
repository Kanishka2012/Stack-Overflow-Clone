import express from 'express'
import { login, signup } from '../controllers/auth.js';
import { getAllUsers, updateUser } from '../controllers/users.js';
import {auth} from '../middlewares/auth.js';

const router=express.Router();

router.post('/login',login);
router.post('/signup',signup);
router.get('/get',getAllUsers);
router.patch('/update/:id',auth, updateUser)

export default router;    