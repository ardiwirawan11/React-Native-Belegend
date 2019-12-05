import { put, call } from 'redux-saga/effects'
import {SHOW_MYAPPLY_DATA, FAILED_GET_MYAPPLY_DATA, SUCCESS_MYAPPLY_DATA} from '../type/MyapplyType';
import { apiGetMyapply } from './api/apiMyapply';
export function* getMyapplyData(action) {
    try {
        const { token } = action;
        const Myapply = yield call(apiGetMyapply, token)
        yield put({ type: SHOW_MYAPPLY_DATA, payload: Myapply })
        yield put({ type: SUCCESS_MYAPPLY_DATA, payload: 'Successfully get ' })
    } catch (error) {
        yield put({ type: FAILED_GET_MYAPPLY_DATA, payload: 'Fatal ERROR' })
    }
}

