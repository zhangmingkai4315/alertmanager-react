

import {call, put, takeLatest,takeEvery} from 'redux-saga/effects';

import API from '../api/alerts';

import { FETCH_ALERTS } from '../actions/const';
import { fetchAlertsSuccess, fetchAlertsFail} from '../actions/alerts';

export function * fetchAlertsFromAPI() {
    yield takeEvery(FETCH_ALERTS, makeFetchAlerts);
}
export function * makeFetchAlerts() {
    try{
        const alerts = yield call(API.fetchAlert);
        if (alerts.status &&alerts.status !== 200) {
            throw new Error(`StatusCode=${alerts.status}`)
        }
        yield put(fetchAlertsSuccess(alerts.data.data));
    }catch(error){
        console.log(error)
        yield put(fetchAlertsFail(error))
    }
}
