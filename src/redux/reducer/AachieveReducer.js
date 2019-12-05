import {REQUEST_AACHIEVE_DATA, SHOW_AACHIEVE_DATA, FAILED_GET_AACHIEVE_DATA, SUCCESS_AACHIEVE_DATA} from '../type/AachieveType'
const initialState = {
    loading: true,
    data: [],
    message: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_AACHIEVE_DATA:
            return {
                ...state,
                loading: true
            }
        case SHOW_AACHIEVE_DATA:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case FAILED_GET_AACHIEVE_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case SUCCESS_AACHIEVE_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        default:
            return state
    }
}