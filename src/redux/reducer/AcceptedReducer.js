import {REQUEST_ACCEPTED_DATA, SHOW_ACCEPTED_DATA, FAILED_GET_ACCEPTED_DATA, SUCCESS_ACCEPTED_DATA} from '../type/AcceptedType'
const initialState = {
    loading: true,
    data: [],
    message: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_ACCEPTED_DATA:
            return {
                ...state,
                loading: true
            }
        case SHOW_ACCEPTED_DATA:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case FAILED_GET_ACCEPTED_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case SUCCESS_ACCEPTED_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        default:
            return state
    }
}