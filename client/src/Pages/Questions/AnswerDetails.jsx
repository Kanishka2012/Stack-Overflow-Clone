import React from 'react'
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {deleteAnswer} from '../../actions/question';

import './Questions.css'
import Avatar from '../../components/Avatar/Avatar'

const AnswerDetails = ({question, handleShare}) => {
    const dispatch = useDispatch();
    const User = useSelector((state)=> state.currentUserReducer);
    const {id} = useParams();

    const handleDelete = (noOfAnswers, answerId) =>{
        dispatch(deleteAnswer(id,noOfAnswers-1,answerId));
    }
  return (
    <div>
        {question.answers.map((answer)=>(
            <div className='display-ans' key={answer._id}>
                <p>{answer.answerBody}</p>
                <div className='question-actions-user'>
                    <div>
                        <button onClick={handleShare}>Share</button>
                        {(answer.userId === User?.result?._id) && 
                          <button onClick={()=>handleDelete(question.noOfAnswers,answer._id)}>Delete</button>
                        }
                    </div>
                    <div>
                        <p>answered {moment(answer.answeredOn).fromNow()}</p>
                        <Link to={`/Users/${answer.userId}`} className='user-link' style={{color:"#0086d8"}} >
                            <Avatar backgroundColor="lightgreen" px="8px" py="5px" borderRadius="4px">{answer.userAnswered.charAt(0).toUpperCase()}</Avatar>
                            <div>{answer.userAnswered}</div>
                        </Link>
                    </div>
                    </div>
                </div>
            ))}
        </div>

  )
}

export default AnswerDetails
