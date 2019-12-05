import {REQUEST_INVESTOR_DATA, SHOW_INVESTOR_DATA, FAILED_GET_INVESTOR_DATA, SUCCESS_INVESTOR_DATA} from '../type/InvestorType'
const initialState = {
    loading: true,
    data: [],
    message: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_INVESTOR_DATA:
            return {
                ...state,
                loading: true
            }
        case SHOW_INVESTOR_DATA:
            if (action.payload === null){
                return {
                    ...state,
                    loading: false,
                    data: []
                }
            }else {
                return {
                    ...state,
                    loading: false,
                    data: action.payload
                }
            }
            
        case FAILED_GET_INVESTOR_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case SUCCESS_INVESTOR_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        default:
            return state
    }
}