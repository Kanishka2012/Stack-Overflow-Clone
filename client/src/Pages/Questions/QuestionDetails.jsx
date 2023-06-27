import React,{useState} from 'react'
import {Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import copy from 'copy-to-clipboard';

import upvoteImg from '../../images/sort-up.svg';
import downvoteImg from '../../images/sort-down.svg'
import Avatar from '../../components/Avatar/Avatar'
import AnswerDetails from './AnswerDetails'
import './Questions.css'
import { postAnswer, deleteQuestion, handleVotes } from '../../actions/question';

const QuestionDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const {id}=useParams();
    const [answerBody, setAnswerBody] = useState("");
    const [isUpVote,setIsUpVote] = useState(false);
    const [isDownVote,setIsDownVote] = useState(false);
    
    const questionList = useSelector((state) => state.questionReducer);
    const User = useSelector((state)=> state.currentUserReducer);
    const url = "http://localhost:3000"

    const handleSubmit = (e,noOfAnswers)=>{ 
      e.preventDefault();
      if(User){
        if(answerBody){
          noOfAnswers++;
          dispatch(postAnswer({id,answerBody,userAnswered:User.result.name,userId:User.result._id,noOfAnswers}));
          setAnswerBody("");
        }
        else{
          alert("Please enter answer to post the answer.")
        }
      }
      else {
        alert("Please login first to answer the question");
        navigate('/Auth');
      }
    }

    const handleShare = () => {
      if(User){
        copy(url + location.pathname);
        alert ("The url has been copied " + url + location.pathname );
      }
      else{
        alert("Please login first to share");
        navigate('/Auth');
      }
    }
    
    const handleDelete = () => {
      dispatch(deleteQuestion(id,navigate));
    }

    const handleUpVotes = (question, userId) => {
      if(User){
        dispatch(handleVotes(id, User.result._id, "upVote"));
      }
      else{
        alert("Please login first to upvote");
        navigate('/Auth');
      }
    }

    const handleDownVotes = (question,userId) => {
      if(User){
        dispatch(handleVotes(id, User.result._id, "downVote"));
        if(question.downVotes.includes(userId)){
          setIsDownVote(true);
        }
      }
      else{
        alert("Please login first to downvote");
        navigate('/Auth');
      }
    }

  return (
    <div className='question-details-page'>
      {
        questionList.data===null?(
        <h4>Loading...</h4>):(
        <>
      {
       (questionList.data.filter((question) => question._id === id))
       .map((question) => (
         <div key={question._id}>
           <section className="question-details-container">
              <h1>{question.title}</h1>
              <div className="question-details-container-2">
                <div className="question-votes">
                  <img src={upvoteImg} alt="upvote" width="18"
                  className='votes-icon' onClick={() => handleUpVotes(question, User?.result?._id)} />
                  <p>{question.upVotes.length-question.downVotes.length}</p>
                  <img src={downvoteImg} alt="downvote" 
      
                  className={`votes-icon $(isDownVote? "width1": "width2")`} onClick={() => handleDownVotes(question, User?.result?._id)}/>
                </div>
                <div style={{ width: "100%"}}>
                  <p className='question-body'>{question.body}</p>
                  <div className="question-details-tags">
                    {
                      question.tags.map((tag)=>(
                        <p key={tag}>{tag}</p>
                      ))
                    }
                  </div>
                  <div className='question-actions-user'>
                    <div>
                      <button type='button' onClick={handleShare}>Share</button>
                      {(question.userId === User?.result?._id) && 
                       <button type='button' onClick={handleDelete}>Delete</button>
                      }
                      
                    </div>
                    <div>
                      <p>asked {moment(question.askedOn).fromNow()}</p>
                      <Link to={`/Users/${question.userId}`} className='user-link' style={{color:"#0086d8"}}>
                       <Avatar backgroundColor="orange" px="8px" py="5px" borderRadius="4px">{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                       <div>{question.userPosted}</div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {question.noOfAnswers!==0 &&
            <section>
              <h3>{question.noOfAnswers} answers</h3>
              <AnswerDetails question={question} key={question._id} handleShare={handleShare}/>
            </section>}
            
            <section className='post-ans-container'>
              <h3>Your Answer</h3>
              <form onSubmit={(e)=>{handleSubmit(e,question.answers.length)}}>
                <textarea name="" id="" 
                 onChange={(e)=>setAnswerBody(e.target.value)}
                 cols="30" rows="10"></textarea>
                <br />
                <input type="submit" value="Post Your Answer" className="post-ans-btn" />
              </form>
              <p>Browse other Question tagged 
              {question.tags.map((tag)=>(
                <Link to='/Tags'key={tag} className='ans-tags'>{" "} {tag} {" "}</Link>
              ))}{" "}
              or
              <Link to='/AskQuestion' style={{textDecoration:"none",color:"#009dff"}}> {" "}Ask your own question</Link>
              </p>
            </section>
          </div>
))
// console.log(question))
}
       </>)
      }
    </div>
  )
}

export default QuestionDetails
