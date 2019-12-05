import { REQUEST_MYAPPLY_DATA } from '../type/MyapplyType'
export const getMyapply = (data) => {
    return {
        type: REQUEST_MYAPPLY_DATA,
        token: data
    }
}