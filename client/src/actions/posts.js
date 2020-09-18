import { GET_POSTS, POSTS_ERROR, GET_POST, POST_ERROR, POST_SUCCESS, LIKE_POST, GET_USER_POSTS } from './constants';
import axios from 'axios'

// Get all posts
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

// get a user's posts
export const getUserPosts = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${userId}/posts`)
        dispatch({
            type: GET_USER_POSTS,
            payload: res.data
        })
    } catch (err) {
        console.log(err.message);
        dispatch({
            type: POST_ERROR
        })
    }
}

// get one post
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

// make a post
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

// like a post
export const likePost = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/${postId}/like`);
        dispatch({
            type: LIKE_POST,
            payload: {postId, likes: res.data}
        })
    } catch (err) {
        console.log(err.message);
        dispatch({
            type: POST_ERROR
        })
    }
}