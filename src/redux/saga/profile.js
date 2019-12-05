import { put, call } from 'redux-saga/effects'
import {SHOW_ATHLETE_DATA, FAILED_GET_ATHLETE_DATA, SUCCESS_ATHLETE_DATA} from '../type/ProfileType';
import { apiGetProfile } from './api/apiProfile';
export function* getProfileData(action) {
    try {
        const { id } = action;
        const Profile = yield call(apiGetProfile, id)
        yield put({ type: SHOW_ATHLETE_DATA, payload: Profile })
        yield put({ type: SUCCESS_ATHLETE_DATA, payload: 'Successfully get ' })
    } catch (error) {
        yield put({ type: FAILED_GET_ATHLETE_DATA, payload: 'Fatal ERROR' })
    }
}

