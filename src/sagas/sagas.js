

import {call, put, takeLatest, throttle,select} from 'redux-saga/effects';

import API from '../lib/api';

import { FETCH_ALERTS,
         FETCH_STATUS_DATA,
         FETCH_RECERVER,
         CHECK_INHIBITED,CHECK_SILENCED,CHANGE_SERCH_TERM} from '../actions/const';
import { fetchAlertsSuccess,
        fetchReceiverSuccess,
        fetchReceiverFail,
        fetchAlertsFail,
        fetchStatusDataFail,
        fetchStatusDataSuccess} from '../actions';

export function * fetchAlertsFromAPI() {
    yield takeLatest(FETCH_ALERTS, makeFetchAlerts);
}
export function *fetchAlertsUsingSearchBox(){
    yield throttle(500,[CHECK_INHIBITED,CHECK_SILENCED,CHANGE_SERCH_TERM], makeFetchAlerts);
}
export function * makeFetchAlerts() {
    try{
        const getSearchFromStore = (state) => state.alerts.search;
        const search = yield select(getSearchFromStore);
        const alerts = yield call(API.fetchAlert,search);
        if (alerts.status &&alerts.status !== 200) {
            throw new Error(`StatusCode=${alerts.status}`)
        }
        yield put(fetchAlertsSuccess(alerts.data.data));
    }catch(error){
        console.log(error)
        yield put(fetchAlertsFail(error))
    }
}

export function * fetchReceiverFromAPI() {
    yield takeLatest(FETCH_RECERVER, makeFetchReceivers);
}
export function * makeFetchReceivers() {
    try{

        const receivers = yield call(API.fetchReivers,);
        if (receivers.status &&receivers.status !== 200) {
            throw new Error(`StatusCode=${receivers.status}`)
        }
        yield put(fetchReceiverSuccess(receivers.data.data));
    }catch(error){
        yield put(fetchReceiverFail(error))
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
