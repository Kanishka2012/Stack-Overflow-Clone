import * as api from '../api'
import { setCurrentUser } from './currentUser';

export const login = (authData,navigate) => async(dispatch) => {
    try {
        // console.log(authData);
        const {data} =await api.login(authData);
        console.log(data);
        dispatch({type:"AUTH", data});
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
        navigate('/')
    } catch (error) {
        console.log(error.response.data);
    }
    
}

export const signup = (authData,navigate) => async(dispatch) => {
    try {
        //console.log(authData);
        const {data} = await api.signup(authData);
        console.log(data);
        dispatch({type:"AUTH", data});
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
        navigate('/');  
    } catch (error) {
        console.log(error.response.data);
    }   
}