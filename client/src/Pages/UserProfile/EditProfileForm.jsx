import React,{useState} from 'react'
import { useDispatch } from 'react-redux';

import './UserProfile.css'
import { updateUser } from '../../actions/user';

const EditProfileForm = ({currentUser , setSwitch}) => {
   const [name,setName] =useState(currentUser?.result?.name);
   const [about,setAbout] =useState(currentUser?.result?.about);
   const [tags,setTags] =useState("");
   const dispatch = useDispatch();
  // console.log(currentUser);
   const handleSubmit = (e) => {
    e.preventDefault();
    console.log({name,about,tags});
    if(tags.length===0){
      dispatch(updateUser(currentUser?.result?._id, {name:name, about:about, tags: currentUser?.result?.tags}));
    }
    else{
      dispatch(updateUser(currentUser?.result?._id, {name:name, about:about, tags: tags}));
    }
    setSwitch(false);
   }

  return (
    <div>
      <h1 className='edit-profile-title-1'>Edit Your Profile</h1>
      <h2 className='edit-profile-title-2'>Public Information</h2>
      <form className='edit-profile-form' onSubmit={handleSubmit}>
        <label htmlFor="name">
            <h3>Display Name</h3>
            <input type="text" value={name} id="name" 
             onChange={(e)=> setName(e.target.value)} />
        </label>
        <label htmlFor="about">
            <h3>About Me</h3>
         <textarea name="about" id="about" cols="30" rows="10" value={about}
            onChange={(e)=>setAbout(e.target.value)}
            ></textarea>
        </label>
        <label htmlFor="tags">
            <h3>Watched Tags</h3>
            <p>Add tags separated by space</p>
            <input type="text" value={tags} id="tags" 
             onChange={(e)=> setTags(e.target.value.split(' '))} />
        </label>
        <br/>
        <input type="submit" value="Save Profile" className='user-submit-btn'/>
        <button className="user-cancel-btn" onClick={()=>setSwitch(false)}>Cancel</button>
      </form>
    </div>
  )
}

export default EditProfileForm
