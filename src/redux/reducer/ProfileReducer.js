import {REQUEST_PATHLETE_DATA, SHOW_ATHLETE_DATA, FAILED_GET_ATHLETE_DATA, SUCCESS_ATHLETE_DATA} from '../type/ProfileType'
const initialState = {
    loading: true,
    data: [],
    message: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_PATHLETE_DATA:
            return {
                ...state,
                loading: true
            }
        case SHOW_ATHLETE_DATA:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case FAILED_GET_ATHLETE_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case SUCCESS_ATHLETE_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        default:
            return state
    }
}