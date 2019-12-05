import {REQUEST_MYAPPLY_DATA, SHOW_MYAPPLY_DATA, FAILED_GET_MYAPPLY_DATA, SUCCESS_MYAPPLY_DATA} from '../type/MyapplyType'
const initialState = {
    loading: true,
    data: [],
    message: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_MYAPPLY_DATA:
            return {
                ...state,
                loading: true
            }
        case SHOW_MYAPPLY_DATA:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case FAILED_GET_MYAPPLY_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case SUCCESS_MYAPPLY_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        default:
            return state
    }
}