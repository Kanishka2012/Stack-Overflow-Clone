import * as api from '../api';

export const askQuestion = (questionData,navigate) => async(dispatch) =>{
    try {
        const {data}=await api.askQuestion(questionData);
        dispatch({type:"POST_QUESTION",payload:data});
        dispatch(fetchAllQuestions())
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const fetchAllQuestions = () => async(dispatch) => {
    try {
        const {data} = await api.fetchAllQuestions();
        dispatch({type:"FETCH_ALL_QUESTIONS", payload:data})
    } catch (error) {
        console.log(error);
    }
}

export const deleteQuestion = (id,navigate) => async(dispatch) => {
    try {
        const {data} = api.deleteQuestion(id);
        dispatch(fetchAllQuestions());
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}


export const handleVotes = (id, userId, value) => async(dispatch) => {
    try {
        const {data} = api.handleVotes(id,userId,value);
        dispatch(fetchAllQuestions());
    } catch (error) {
        console.log(error);
    }
}


export const postAnswer = (answerData) => async(dispatch) => {
    try {
        const { id, noOfAnswers, answerBody, userAnswered, userId } = answerData;
        const {data} =await api.postAnswer(id,answerBody,userAnswered,userId,noOfAnswers);
        dispatch({type:"POST_ANSWER",payload:data});
        dispatch(fetchAllQuestions());
    } catch (error) {
        console.log(error);
    }
}

export const deleteAnswer = (id,noOfAnswers,answerId) => async(dispatch) =>{
    try {
        const {data} = api.deleteAnswer(id,noOfAnswers,answerId);
        dispatch(fetchAllQuestions());
    } catch (error) {
        console.log(error);
    }
}

