import { GET_POSTS, GET_POST, POST_SUCCESS } from '../actions/constants';

const initialState = {
    posts: [],
    loading: true,
    post: null
}

 const posts = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                loading: false,
                posts: payload
            }
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false
            }
        case POST_SUCCESS:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            }
        default:
            return state
    }
}

export default posts