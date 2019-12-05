import { REQUEST_DETAIL_DATA } from '../type/DetailType'
export const getDetail = (token, id) => {
    return {
        type: REQUEST_DETAIL_DATA,
        token: token,
        id: id
    }
}