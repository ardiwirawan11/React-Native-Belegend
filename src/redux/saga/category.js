import { put, call } from 'redux-saga/effects'
import {SHOW_CATEGORY_DATA, FAILED_GET_CATEGORY_DATA, SUCCESS_CATEGORY_DATA} from '../type/CategoryType';
import { apiGetCategory } from './api/apiCategory';
export function* getCategoryData(action) {
    try {
        const Category = yield call(apiGetCategory, action)
        yield put({ type: SHOW_CATEGORY_DATA, payload: Category })
        yield put({ type: SUCCESS_CATEGORY_DATA, payload: 'Successfully get ' })
    } catch (error) {
        yield put({ type: FAILED_GET_CATEGORY_DATA, payload: 'Fatal ERROR' })
    }
}

