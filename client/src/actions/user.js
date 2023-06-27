import * as api from '../api';

export const fetchAllUsers = () => async(dispatch) => {
    try {
        const {data} =await api.fetchAllUsers();
        dispatch({type:"FETCH_USERS", payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = (id, updateData) => async(dispatch) => {
    try {
        const {data} = await api.updateUser(id,updateData);
        dispatch({type:"UPDATE_USER", payload:data});
    } catch (error) {
        console.log(error);
    }
}