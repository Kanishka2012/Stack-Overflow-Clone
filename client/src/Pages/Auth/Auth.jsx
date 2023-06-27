import React,{useState} from 'react'
import icon from '../../images/icon.png'
import AboutAuth from '../AbouAuth/AboutAuth';
import './Auth.css'
import {login,signup} from '../../actions/auth';
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const dispatch = useDispatch()
    const navigate= useNavigate();
    const [isSignUp, setisSignUp] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = ()=>{
        setisSignUp(!isSignUp);
        setName("");
        setEmail("");
        setPassword("");
    }
    const handleSubmit = (e) =>{
      e.preventDefault();
      if(!email) alert("Please enter email");
      if(!password)  alert("Please enter password");
      if(isSignUp){
        if(!name)  alert("Please enter name")
        dispatch(signup({name,email,password},navigate));
      }
      else dispatch(login({email,password},navigate));
    }
  return (
    <section className="auth-section">
       {isSignUp && <AboutAuth />}
      <div className='auth-container-2'>
        {!isSignUp && <img src={icon} className='logo-icon' alt="Stack Overflow" />}
        <form onSubmit={handleSubmit}>
            {isSignUp && 
            <label htmlFor="name">
            <h4>Name</h4>
            <input type="text" name="name" id="name" onChange={(e)=>{setName(e.target.value)}}/>
            </label>
            }
            <label htmlFor="email">
                <h4>Email</h4>
                <input type="email" name="email" id="email" onChange={(e)=>{setEmail(e.target.value)}}/>
            </label>
            <label htmlFor="password">
                <div style={{display:"flex", justifyContent:"space-between"}}>
                  <h4>Password</h4>
                  {!isSignUp && <p style={{color:"rgb(0, 122, 198)",fontSize:"13px"}}>Forgot Password?</p>}
                </div>
                <input type="password" name="password" id="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                {isSignUp && 
            <p className='text'>Passwords must contain at least eight<br />
            characters, including at least 1 letter and 1<br />
            number.</p>}
            </label>
            

            {isSignUp &&
              <label htmlFor='check' style={{display:"flex", fontSize:"13px"}}>
                 <input style={{width:"5%",marginBottom:"30px"}} type="checkbox" id="check" />
                 <p>Opt-in to receive occasional <br />
                 product updates, user research invitations,<br />
                 company announcements, and digests.</p>
              </label>
            }

            <button type="submit" className='auth-btn'>
                {!isSignUp? 'Log In' : 'Sign Up'}
            </button>
            {isSignUp && <p className='text'>By clicking “Sign up”, you agree to our
            <span className='text-blue'> terms of <br/> service</span>  
            <span className='text-blue'> privacy policy</span>  and 
            <span className='text-blue'> cookie policy</span> </p>}
        </form>
        <div style={{display:"flex",alignItems:"center", marginTop:"10px"}}>
          {!isSignUp? "Don't have an account?" : "Already have an acount" }
          <button className="handle-switch-btn" type="submit" onClick={handleClick}>{!isSignUp ? "Sign Up" : "Log In" }</button>
        </div>
      </div>
    </section>
  )
}

export default Auth
