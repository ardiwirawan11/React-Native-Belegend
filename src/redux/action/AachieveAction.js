import { REQUEST_AACHIEVE_DATA } from '../type/AachieveType'
export const getAachieve = (data) => {
    return {
        type: REQUEST_AACHIEVE_DATA,
        id: data
    }
}