import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';

import './HomeMainBar.css'

const Questions = ({question}) => {
  return (
    <div className='display-question-container'>
      <div className='display-votes-ans'>
        <p>{question.upVotes.length - question.downVotes.length} votes</p>
      </div>
      <div className='display-votes-ans'>
        <p>{question.noOfAnswers} answers</p>
      </div>
      <div className='display-question-details'>
        <Link to={`/Questions/${question._id}`}>{question.title}</Link>
        <div className='display-tags-time'>
          <div className='display-tags'>
            {question.tags.map((tag)=>
            <p key={tag}>{tag}</p>)}
          </div>
          <p className='display-time'>asked {moment(question.askedOn).fromNow()} by {question.userPosted}</p>
        </div>
      </div>
    </div>
  )
}

export default Questions
