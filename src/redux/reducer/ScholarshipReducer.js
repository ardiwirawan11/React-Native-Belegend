import {REQUEST_SCHOLARSHIP_DATA, SHOW_SCHOLARSHIP_DATA, FAILED_GET_SCHOLARSHIP_DATA, SUCCESS_SCHOLARSHIP_DATA} from '../type/ScholarshipType'
const initialState = {
    loading: true,
    data: [],
    message: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_SCHOLARSHIP_DATA:
            return {
                ...state,
                loading: true
            }
        case SHOW_SCHOLARSHIP_DATA:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case FAILED_GET_SCHOLARSHIP_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case SUCCESS_SCHOLARSHIP_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        default:
            return state
    }
}