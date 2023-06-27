import axios from 'axios';

const API = axios.create({baseURL:"http://localhost:5000/"});
API.interceptors.request.use((req)=>{
    if(localStorage.getItem("Profile")){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`;
    }
    return req;
})

export const signup = (authData) => API.post('/user/signup',authData);
export const login = (authData) => API.post('/user/login',authData);

export const askQuestion = (questionData) => API.post('/question/askQuestion',questionData);
export const fetchAllQuestions = () => API.get('/question/get');
export const deleteQuestion = (id) => API.delete(`/question/delete/${id}`);
export const handleVotes = (id,userId,value) => API.patch(`/question/vote/${id}`, {userId,value});

export const postAnswer = (id,answerBody,userAnswered,userId,noOfAnswers) => API.patch(`/answer/post/${id}`,{answerBody,userAnswered,userId,noOfAnswers});
export const deleteAnswer = (id,noOfAnswers, answerId) => API.patch(`/answer/delete/${id}`,{noOfAnswers,answerId});

export const fetchAllUsers = () => API.get('/user/get');
export const updateUser = (id,updateData) => API.patch(`/user/update/${id}`, updateData)

