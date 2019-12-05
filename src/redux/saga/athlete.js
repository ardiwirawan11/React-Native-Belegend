import { put, call } from 'redux-saga/effects'
import {SHOW_ATHLETE_DATA, FAILED_GET_ATHLETE_DATA, SUCCESS_ATHLETE_DATA} from '../type/AthleteType';
import { apiGetAthlete } from './api/apiAthlete';
export function* getAthleteData(action) {
    try {
        const { token } = action;
        const Athlete = yield call(apiGetAthlete, token)
        yield put({ type: SHOW_ATHLETE_DATA, payload: Athlete })
        yield put({ type: SUCCESS_ATHLETE_DATA, payload: 'Successfully get ' })
    } catch (error) {
        yield put({ type: FAILED_GET_ATHLETE_DATA, payload: 'Fatal ERROR' })
    }
}

