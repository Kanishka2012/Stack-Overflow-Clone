import React from 'react'
import { useSelector } from 'react-redux'

import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import UserList from './UserList'
import './Users.css'

const Users = () => {
    const userList = useSelector((state)=> state.userReducer);
    // console.log(userList);
  return (
    <div className='home-container-1'>
      <LeftSideBar />
      <div className="home-container-2" style={{marginTop:"30px"}}>
        <h1 style={{ fontWeight: "400", marginBottom:"0px" }}>Users</h1>
        <UserList userList={userList}/>
      </div>
    </div>
  )
}

export default Users
