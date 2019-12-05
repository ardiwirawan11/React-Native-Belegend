import { put, call } from 'redux-saga/effects'
import {SHOW_ACHIEVE_DATA, FAILED_GET_ACHIEVE_DATA, SUCCESS_ACHIEVE_DATA} from '../type/AchieveType';
import { apiGetAchieve } from './api/apiAchieve';
export function* getAchieveData(action) {
    try {
        const { token } = action;
        const Achieve = yield call(apiGetAchieve, token)
        yield put({ type: SHOW_ACHIEVE_DATA, payload: Achieve })
        yield put({ type: SUCCESS_ACHIEVE_DATA, payload: 'Successfully get ' })
    } catch (error) {
        yield put({ type: FAILED_GET_ACHIEVE_DATA, payload: 'Fatal ERROR' })
    }
}

