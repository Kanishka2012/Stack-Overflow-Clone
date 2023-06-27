import {BrowserRouter as Router} from 'react-router-dom'
import React , { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import AllRoutes from './AllRoutes/AllRoutes'
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/user'

function App() {
  const dispatch= useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
    const interval=setInterval(()=>{
      dispatch(fetchAllQuestions());
      dispatch(fetchAllUsers());
      },1000);
  },[dispatch]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
