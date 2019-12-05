import { put, call } from 'redux-saga/effects'
import {SHOW_INVESTOR_DATA, FAILED_GET_INVESTOR_DATA, SUCCESS_INVESTOR_DATA} from '../type/InvestorType';
import { apiGetInvestor } from './api/apiInvestor';
export function* getInvestorData(action) {
    try {
        const { token } = action;
        const Investor = yield call(apiGetInvestor, token)
        yield put({ type: SHOW_INVESTOR_DATA, payload: Investor })
        yield put({ type: SUCCESS_INVESTOR_DATA, payload: 'Successfully get ' })
    } catch (error) {
        yield put({ type: FAILED_GET_INVESTOR_DATA, payload: 'Fatal ERROR' })
    }
}

