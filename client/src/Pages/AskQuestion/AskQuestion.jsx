import React from 'react'
import { useState } from 'react'
import { useDispatch,  useSelector  } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './AskQuestion.css'
import { askQuestion } from '../../actions/question'

const AskQuestion = () => {
  const [title,setTitle] =useState("");
  const [body,setBody] =useState("");
  const [tags,setTags] =useState("");

  const dispatch=useDispatch();
  const navigate = useNavigate();
  const User = useSelector((state)=> state.currentUserReducer)

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(User){
      if(title && body && tags){
        dispatch(askQuestion({title,body,tags,userPosted:User.result.name, userId : User.result._id},navigate))
      }
      else alert("Enter all the required fields");
    }
    else {
      alert("Login to ask a question");
      navigate('/Auth');
    }
  }

  const handleEnter = (e) =>{
    if(e.key === 'Enter'){
      setBody(body + "/n");
    }
  }

  return (
    <div className='ask-ques'>
      <div className='ask-ques-container'>
      <h1>Ask a Public Question</h1>
      <form onSubmit={handleSubmit}>
        <div className="ask-form-container">
        <label htmlFor="ask-ques-title">
          <h4>Title</h4>
          <p>Be specific and imagine you're asking a question to another person</p>
          <input type="text" name="ask-ques-title" id='ask-ques-title' 
           onChange={(e)=> setTitle(e.target.value)}
           placeholder="e.g. Is there an R function for finding the index of an element in a vector?"/>
        </label>
        <label htmlFor="ask-ques-body">
          <h4>Body</h4>
          <p>Include all the information someone would need to answer your question</p>
          <textarea name="ask-ques-body" id="ask-ques-body" 
           onChange={(e)=> setBody(e.target.value)}
           onKeyPress={handleEnter}
           cols="30" rows="10"></textarea>
        </label>
        <label htmlFor="ask-ques-tags">
          <h4>Tags</h4>
          <p>Add upto five tags to describe what your question is about</p>
          <input type="text" name="ask-ques-tags" id='ask-ques-tags'
           onChange={(e)=> setTags(e.target.value)}
           placeholder="e.g. (xml typescript wordpress)"/>
        </label>
        </div>
        <input type="submit" value="Review your question" className='review-btn' />
      </form>
      
      </div>
    </div>
  )
}

export default AskQuestion
