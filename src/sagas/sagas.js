

import {call, put, takeLatest} from 'redux-saga/effects';

import API from '../lib/api';

import { FETCH_ALERTS,FETCH_STATUS_DATA } from '../actions/const';
import { fetchAlertsSuccess, fetchAlertsFail,fetchStatusDataFail,fetchStatusDataSuccess} from '../actions';

export function * fetchAlertsFromAPI() {
    yield takeLatest(FETCH_ALERTS, makeFetchAlerts);
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



export function * fetchStatusFromAPI(){
    yield takeLatest(FETCH_STATUS_DATA, makeFetchStatus);
}
export function * makeFetchStatus() {
    try{
        const status = yield call(API.fetchStatus);
        if (status.status &&status.status !== 200) {
            throw new Error(`StatusCode=${status.status}`)
        }
        yield put(fetchStatusDataSuccess(status.data.data));
    }catch(error){
        console.log(error)
        yield put(fetchStatusDataFail(error))
    }
}
