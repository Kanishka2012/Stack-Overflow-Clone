import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { useSelector , useDispatch} from 'react-redux';
import { useEffect } from 'react';
import decode from 'jwt-decode';

import Avatar from '../Avatar/Avatar';
import searchIcon from '../../images/searchicon.svg';
import logo from '../../images/logo.png'
import  {setCurrentUser}  from '../../actions/currentUser';
import './Navbar.css'

const Navbar = () => {
  var User= useSelector((state) => state.currentUserReducer);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const handleLogout=()=>{
    dispatch({type:"LOGOUT"});
    navigate('/');
    dispatch(setCurrentUser(null));
  }

  useEffect(()=>{
    const token = User?.token;
    if(token){
      const decodedToken = decode(token);
      if(decodedToken.exp*1000 < new Date().getTime()){
        handleLogout();
      }
    }
    

    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
  },[dispatch])
  return (
    <nav className='main-nav'>
      <div className="navbar">
        <Link className="nav-item nav-logo" to='/'>
              <img src={logo} alt="logo" />
        </Link>
        <Link className="nav-item nav-btn" to='/about'>About</Link>
        <Link className="nav-item nav-btn" to='/products'>Products</Link>
        <Link className="nav-item nav-btn" to='/for-teams'>For Teams</Link>
        <form >
            <input type="text" placeholder='Search...' />
            <img className='search-icon' src={searchIcon} alt="search-icon" width="15px" />
        </form>
        { User === null?
        <>
           <Link className="nav-item nav-link" to='/Auth' >Log In</Link> 
        </>
        :
        <>
          <Avatar className="nav-item" backgroundColor="#009dff" color="white" borderRadius="50%" px="10px" py="7px" cursor="pointer"> 
          <Link style={{textDecoration:"none" ,color:"white"}} to={`/Users/${User?.result?._id}`}> {User.result.name.charAt(0).toUpperCase()} </Link>
          </Avatar>
          <button className='nav-item nav-link' onClick={handleLogout}>  Log Out</button>
        </>
        }
      </div>
    </nav>
  )
}

export default Navbar
