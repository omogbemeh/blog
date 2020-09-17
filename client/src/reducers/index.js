import { combineReducers } from 'redux';
import auth from './auth';
import posts from './posts';
import profile from './profile';

export const rootReducer = combineReducers({
    auth,
    posts,
    profile
})