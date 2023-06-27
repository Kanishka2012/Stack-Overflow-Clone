import React from 'react'
import {useLocation,useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import QuestionList from './QuestionList';
import './HomeMainBar.css'

const HomeMainBar = () => {
  const location=useLocation();
  const user="Kanishka";
  const navigate=useNavigate();

  const questionList = useSelector((state) => state.questionReducer);

  const redirect =() =>{
    if(user===null){
      alert("Please Login or Signup first");
      navigate('/Auth');
    }
    else{
      navigate('/AskQuestion');
    }
  } 

  // var questionList=[
  //   {
  //     _id:1,
  //     upVotes:4,
  //     downVotes:2,
  //     noOfAnswers:2,
  //     title:"What is C++",
  //     body:"It meant to be",
  //     tags:["c++","java","ReactJS","mongoDB"],
  //     userPosted:"Kanishka",
  //     userId:1,
  //     askedOn:"Jan 1",
  //     answer:[
  //       {
  //         answerBody:"C++ is a programming language",
  //         userAnswered:"Rama",
  //         answeredOn:"March 20",
  //         userId:3
  //       }
  //     ]
  //   },
  //   {
  //     _id:2,
  //     upVotes:3,
  //     downVotes:2,
  //     noOfAnswers:2,
  //     title:"What is function",
  //     body:"It meant to be",
  //     tags:["c++","java","ReactJS","mongoDB"],
  //     userPosted:"Sherry",
  //     userId:2,
  //     askedOn:"Jan 1",
  //     answer:[
  //       {
  //         answerBody:"Function is a part of program",
  //         userAnswered:"Rama",
  //         answeredOn:"March 20",
  //         userId:2
  //       }
  //     ]
  //   } 
  // ]

  return (
    <div className='main-bar'>
      <div className="main-bar-header">
        {location.pathname == '/'?
        <h1>Top Questions</h1> : 
        <h1>All Questions</h1>}
        <button className='ask-btn' onClick={redirect}>Ask Question</button>
      </div>
      <div >
         {questionList.data===null? 
         <h4>Loading..</h4>
        :
        <>
        <p>{questionList.data.length} questions</p>
        <QuestionList questionList={questionList.data}/>
        </>
        }
      </div>
    </div>
  )
}

export default HomeMainBar
