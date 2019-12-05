import {REQUEST_CATEGORY_DATA, SHOW_CATEGORY_DATA, FAILED_GET_CATEGORY_DATA, SUCCESS_CATEGORY_DATA} from '../type/CategoryType'
const initialState = {
    loading: true,
    data: [],
    message: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_CATEGORY_DATA:
            return {
                ...state,
                loading: true
            }
        case SHOW_CATEGORY_DATA:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case FAILED_GET_CATEGORY_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case SUCCESS_CATEGORY_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        default:
            return state
    }
}