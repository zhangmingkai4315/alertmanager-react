

import {call, put, takeLatest, throttle,select} from 'redux-saga/effects';

import API from '../lib/api';

import { FETCH_ALERTS,
         FETCH_STATUS_DATA,
         FETCH_RECERVER,
         SELECT_RECEIVER,
         CHECK_INHIBITED,
         ALERT_ADD_FILTER,
         ALERT_REMOVE_FILTER,
         CHECK_SILENCED} from '../actions/const';
import { fetchAlertsSuccess,
        fetchReceiverSuccess,
        fetchReceiverFail,
        fetchAlertsFail,
        fetchStatusDataFail,
        fetchStatusDataSuccess} from '../actions';

export function * fetchAlertsFromAPI() {
    // first get all alerts(inhibited=false,silienced=false)
    yield takeLatest(FETCH_ALERTS, makeFetchAlerts);
}
export function *fetchAlertsUsingSearchBox(){
    // refresh alert with search infomation
    yield throttle(500,[SELECT_RECEIVER,CHECK_INHIBITED,CHECK_SILENCED,ALERT_ADD_FILTER,ALERT_REMOVE_FILTER], makeFetchAlerts);
}
export function * makeFetchAlerts() {
    try{
        const getSearchFromStore = (state) => state.alerts.search;
        const getFiltersFromStore = (state) => state.alerts.filters;
        const search = yield select(getSearchFromStore);
        const filters = yield select(getFiltersFromStore);

        const alerts = yield call(API.fetchAlert,search,filters);
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
