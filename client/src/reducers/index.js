import {combineReducers} from 'redux'
import authReducer from './auth'
import currentUserReducer from './currentUser';
import { questionReducer } from './question';
import { userReducer } from './user';

const rootReducers = combineReducers({
    authReducer,currentUserReducer,questionReducer,userReducer
})

export default rootReducers;