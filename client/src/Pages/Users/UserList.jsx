import React from 'react'
import User from './User'

const UserList = ({userList}) => {
    console.log(userList);
  return (
    <div className='user-list-container'>
       {userList.map((user) => (
        <User user={user} key={user?._id} />
      ))}
    </div>
  )
}

export default UserList
