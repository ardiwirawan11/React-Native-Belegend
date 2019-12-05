import { REQUEST_PATHLETE_DATA } from '../type/ProfileType'
export const getProfile = (data) => {
    return {
        type: REQUEST_PATHLETE_DATA,
        id: data
    }
}