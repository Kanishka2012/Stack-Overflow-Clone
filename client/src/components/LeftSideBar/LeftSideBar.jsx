import React from 'react';
import { NavLink } from 'react-router-dom';
import Globe from '../../images/Globe.svg';
import './LeftSideBar.css'

const LeftSideBar = () => {
  return (
    <div className='left-sidebar'>
      <nav className='side-nav'>
        <NavLink className='left-nav-link' activeclassname='active' to='/'><p>Home</p></NavLink>
        <div className="side-nav-div">
        <div><p>PUBLIC</p></div>
        <NavLink className='left-nav-link' activeclassname='active'  to='/Questions'>
            <img src={Globe} alt="Globe" />
            <p style={{paddingLeft:"10px"}}>Questions</p>
            </NavLink>
        <NavLink className='left-nav-link' activeclassname='active'  to='/Users' style={{paddingLeft:"40px"}}><p>Users</p></NavLink>
        <NavLink className='left-nav-link' activeclassname='active' to='/Tags' style={{paddingLeft:"40px"}}><p>Tags</p></NavLink>
        </div>
    
      </nav>
    </div>
  )
}

export default LeftSideBar;
