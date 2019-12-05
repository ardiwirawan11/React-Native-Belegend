import { REQUEST_MYSCHOLARSHIP_DATA } from '../type/MyscholarshipType'
export const getMyscholarship = (data) => {
    return {
        type: REQUEST_MYSCHOLARSHIP_DATA,
        token: data
    }
}