import { GET_USER, USER_ERROR } from './constants'
import axios from 'axios';

export const getUser = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/${userId}`)
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    } catch (err) {
        console.log(err.message);
        dispatch({
            type: USER_ERROR
        })
    }
}

