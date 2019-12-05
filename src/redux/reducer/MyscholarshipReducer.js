import {REQUEST_MYSCHOLARSHIP_DATA, SHOW_MYSCHOLARSHIP_DATA, FAILED_GET_MYSCHOLARSHIP_DATA, SUCCESS_MYSCHOLARSHIP_DATA} from '../type/MyscholarshipType'
const initialState = {
    loading: true,
    data: [],
    message: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_MYSCHOLARSHIP_DATA:
            return {
                ...state,
                loading: true
            }
        case SHOW_MYSCHOLARSHIP_DATA:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case FAILED_GET_MYSCHOLARSHIP_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case SUCCESS_MYSCHOLARSHIP_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        default:
            return state
    }
}