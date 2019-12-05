import { put, call } from 'redux-saga/effects'
import {SHOW_ACCEPTED_DATA, FAILED_GET_ACCEPTED_DATA, SUCCESS_ACCEPTED_DATA} from '../type/AcceptedType';
import { apiGetAccepted } from './api/apiAccepted';
export function* getAcceptedData(action) {
    try {
        const { token, id} = action;
        const Accepted = yield call(apiGetAccepted, token, id)
        yield put({ type: SHOW_ACCEPTED_DATA, payload: Accepted })
        yield put({ type: SUCCESS_ACCEPTED_DATA, payload: 'Successfully get ' })
    } catch (error) {
        yield put({ type: FAILED_GET_ACCEPTED_DATA, payload: 'Fatal ERROR' })
    }
}

