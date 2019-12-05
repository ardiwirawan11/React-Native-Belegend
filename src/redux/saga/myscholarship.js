import { put, call } from 'redux-saga/effects'
import {SHOW_MYSCHOLARSHIP_DATA, FAILED_GET_MYSCHOLARSHIP_DATA, SUCCESS_MYSCHOLARSHIP_DATA} from '../type/MyscholarshipType';
import { apiGetMyscholarship } from './api/apiMyscholarship';
export function* getMyscholarshipData(action) {
    try {
        const { token } = action;
        const Myscholarship = yield call(apiGetMyscholarship, token)
        yield put({ type: SHOW_MYSCHOLARSHIP_DATA, payload: Myscholarship })
        yield put({ type: SUCCESS_MYSCHOLARSHIP_DATA, payload: 'Successfully get ' })
    } catch (error) {
        yield put({ type: FAILED_GET_MYSCHOLARSHIP_DATA, payload: 'Fatal ERROR' })
    }
}

