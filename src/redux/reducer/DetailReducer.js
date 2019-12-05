import {REQUEST_DETAIL_DATA, SHOW_DETAIL_DATA, FAILED_GET_DETAIL_DATA, SUCCESS_DETAIL_DATA} from '../type/DetailType'
const initialState = {
    loading: true,
    data: [],
    message: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_DETAIL_DATA:
            return {
                ...state,
                loading: true
            }
        case SHOW_DETAIL_DATA:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case FAILED_GET_DETAIL_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case SUCCESS_DETAIL_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        default:
            return state
    }
}