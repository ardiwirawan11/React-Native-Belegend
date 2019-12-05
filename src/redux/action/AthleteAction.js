import { REQUEST_ATHLETE_DATA } from '../type/AthleteType'
export const getAthlete = (data) => {
    return {
        type: REQUEST_ATHLETE_DATA,
        token: data
    }
}