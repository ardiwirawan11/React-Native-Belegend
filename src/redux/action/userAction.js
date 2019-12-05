import { REQUEST_USER_DATA } from '../type/userType'
export const getUser = (data) => {
    return {
        type: REQUEST_USER_DATA,
        token: data
    }
}