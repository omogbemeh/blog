import { GET_POSTS, POSTS_ERROR, GET_POST, POST_ERROR, POST_SUCCESS } from './constants';
import axios from 'axios'

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts')
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        console.log(err.message);
        dispatch({
            type: POSTS_ERROR
        })
    }
}

export const getPost = postId => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${postId}`)
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (err) {
        console.log(err.message);
        dispatch({
            type: POST_ERROR
        })
    }
}

export const makePost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/posts', formData, config)
        dispatch({
            type: POST_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        console.log(err.message);
        dispatch({
            type: POST_ERROR
        })
    }
}