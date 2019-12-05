import {REQUEST_ACHIEVE_DATA, SHOW_ACHIEVE_DATA, FAILED_GET_ACHIEVE_DATA, SUCCESS_ACHIEVE_DATA} from '../type/AchieveType'
const initialState = {
    loading: true,
    data: [],
    message: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_ACHIEVE_DATA:
            return {
                ...state,
                loading: true
            }
        case SHOW_ACHIEVE_DATA:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case FAILED_GET_ACHIEVE_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case SUCCESS_ACHIEVE_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        default:
            return state
    }
}