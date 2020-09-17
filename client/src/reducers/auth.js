import { REGISTER_SUCCESS, REGISTER_ERROR, USER_LOADED, LOGIN_SUCCESS, LOGIN_ERROR } from '../actions/constants'

const initialState = {
    loading: true,
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: false
}

export const auth = (state = initialState, action) => {
    const { type, payload } = action
    switch(type) {
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        
        case USER_LOADED:
            return {
                ...state,
                user: payload,
                loading: false,
                isAuthenticated: true
            }
        case LOGIN_ERROR:
        case REGISTER_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                loading: false,
                isAuthenticated: false
            }
        default:
            return state
        }
}

export default auth