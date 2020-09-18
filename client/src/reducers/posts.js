import { GET_POSTS, GET_POST, POST_SUCCESS, LIKE_POST, POST_ERROR, GET_USER_POSTS } from '../actions/constants';

const initialState = {
    posts: [],
    loading: true,
    post: null,
    userPosts: []
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
        case GET_USER_POSTS:
            return {
                ...state,
                loading: false,
                userPosts: payload
            }
        case POST_SUCCESS:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            }
        case LIKE_POST:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.postId ? { ...post, likes: payload.likes } : post),
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default posts