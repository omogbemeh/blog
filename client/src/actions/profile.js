import { GET_USER, USER_ERROR } from './constants'
import axios from 'axios';

export const getUser = () => async dispatch => {
    try {
        const res = await axios.get('/api/users')
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

