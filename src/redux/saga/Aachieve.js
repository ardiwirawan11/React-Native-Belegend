import { put, call } from 'redux-saga/effects'
import {SHOW_AACHIEVE_DATA, FAILED_GET_AACHIEVE_DATA, SUCCESS_AACHIEVE_DATA} from '../type/AachieveType';
import { apiGetAachieve } from './api/apiAachieve';
export function* getAachieveData(action) {
    try {
        const { id } = action;
        const Achieve = yield call(apiGetAachieve, id)
        yield put({ type: SHOW_AACHIEVE_DATA, payload: Achieve })
        yield put({ type: SUCCESS_AACHIEVE_DATA, payload: 'Successfully get ' })
    } catch (error) {
        yield put({ type: FAILED_GET_AACHIEVE_DATA, payload: 'Fatal ERROR' })
    }
}

