import { REGISTER_SUCCESS, REGISTER_ERROR, USER_LOADED, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from './constants';
import axios from 'axios';
import setAuthToken from'../utils/setAuthToken';

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/api/auth')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
    }
}

export const registerUser = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/users', formData, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
        console.log('User Registered');
    } catch (err) {
        console.log(err.message);
        dispatch({
            type: REGISTER_ERROR
        })
    }
}

export const loginUser = formData => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/auth', formData, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (err) {
        console.log(err.message);
        dispatch({
            type: LOGIN_ERROR
        })
    }
}

export const logOut = () => async dispatch => {
    try {
        dispatch({
            type: LOGOUT
        })
    } catch (err) {
        console.log(err.message);
    }
}