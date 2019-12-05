import { put, call } from 'redux-saga/effects'
import {SHOW_SCHOLARSHIP_DATA, FAILED_GET_SCHOLARSHIP_DATA, SUCCESS_SCHOLARSHIP_DATA} from '../type/ScholarshipType';
import { apiGetScholarship } from './api/apiScholarship';
export function* getScholarshipData(action) {
    try {
        const Scholarship = yield call(apiGetScholarship, action)
        yield put({ type: SHOW_SCHOLARSHIP_DATA, payload: Scholarship })
        yield put({ type: SUCCESS_SCHOLARSHIP_DATA, payload: 'Successfully get ' })
    } catch (error) {
        yield put({ type: FAILED_GET_SCHOLARSHIP_DATA, payload: 'Fatal ERROR' })
    }
}

