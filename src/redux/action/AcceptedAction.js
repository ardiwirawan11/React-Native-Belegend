import { REQUEST_ACCEPTED_DATA } from '../type/AcceptedType'
export const getAccepted = (token, id) => {
    return {
        type: REQUEST_ACCEPTED_DATA,
        token: token,
        id: id
    }
}