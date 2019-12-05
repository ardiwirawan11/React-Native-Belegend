import { REQUEST_ACHIEVE_DATA } from '../type/AchieveType'
export const getAchieve = (data) => {
    return {
        type: REQUEST_ACHIEVE_DATA,
        token: data
    }
}