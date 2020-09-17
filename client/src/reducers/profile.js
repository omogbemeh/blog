import { GET_USER, USER_ERROR } from '../actions/constants'

const initialState = {
    loading: true,
    profiles: [],
    profile :null,
    user: null
}

const profile = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case GET_USER:
            return {
                ...state,
                user: payload,
                loading: false
            }
        case USER_ERROR:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default profile