

import {call, put, takeLatest, throttle,select} from 'redux-saga/effects';

import API from '../lib/api';

import { FETCH_ALERTS,
         FETCH_STATUS_DATA,
         FETCH_RECERVER,
         FETCH_SILENCES,
         SELECT_RECEIVER,
         CHECK_INHIBITED,
         ALERT_ADD_FILTER,
         ALERT_REMOVE_FILTER,
         CHECK_SILENCED,
         POST_NEW_SILENCE,
         DELETE_SILENCE_WITH_ID,
         FETCH_SILENCE_WITH_ID} from '../actions/const';
         
import { fetchAlertsSuccess,
        fetchReceiverSuccess,
        fetchReceiverFail,
        fetchAlertsFail,
        fetchStatusDataFail,
        fetchStatusDataSuccess,
        fetchSilencesFail,
        fetchSilencesSuccess,
        fetchSilenceWithIDSuccess,
        fetchSilenceWithIDFail,
        fetchSilenceWithID,
        postNewSilenceFail,
        postNewSilenceSuccess,
        deleteSilenceWithIDFail,
        deleteSilenceWithIDSuccess,
        fetchSilenceWithAffectedAlerts
        } from '../actions';

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
        yield put(fetchStatusDataFail(error))
    }
}


export function * fetchSilencesFromAPI() {
    yield takeLatest(FETCH_SILENCES, makeFetchSilences);
}
export function * makeFetchSilences() {
    try{
        const getSearchFromStore = (state) => state.silences.search;
        const getFiltersFromStore = (state) => state.silences.filters;
        const search = yield select(getSearchFromStore);
        const filters = yield select(getFiltersFromStore);

        const silences = yield call(API.fetchSilences,search,filters);
        if (silences.status &&silences.status !== 200) {
            throw new Error(`StatusCode=${silences.status}`)
        }
        yield put(fetchSilencesSuccess(silences.data.data));
    }catch(error){
        yield put(fetchSilencesFail(error))
    }
}


export function * fetchSilencesWithIDFromAPI() {
    yield takeLatest(FETCH_SILENCE_WITH_ID, makeFetchSilenceWithID);
}
export function * makeFetchSilenceWithID(action) {
    try{
        const silence = yield call(API.fetchSilenceWithID,action.payload);
        if (silence.status &&silence.status !== 200) {
            throw new Error(`StatusCode=${silence.status}`)
        } 
        yield put(fetchSilenceWithIDSuccess(silence.data.data));

        const matchers = silence.data.data.matchers;
        const search = {silenced:true,inhibited:false,receiver:""}
        const filters = matchers.map(m=>`${m.name}=${m.value}`)
        const alerts = yield call(API.fetchAlert,search,filters);

        if (alerts.status &&alerts.status !== 200) {
            throw new Error(`StatusCode=${alerts.status}`)
        }
        yield put(fetchSilenceWithAffectedAlerts(alerts.data.data));
    }catch(error){
        yield put(fetchSilenceWithIDFail(error))
    }
}

export function * postNewSilence() {
    yield takeLatest(POST_NEW_SILENCE, makePostNewSilence);
}
export function * makePostNewSilence(action) {
    try{
        const silence = yield call(API.postNewSilence,action.payload);
        if (silence.status &&silence.status !== 200) {
            throw new Error(`StatusCode=${silence.status}`)
        }
        yield put(postNewSilenceSuccess(silence.data.data));
    }catch(error){
        yield put(postNewSilenceFail(error))
    }
}


export function * deleteSilenceWithIDFromAPI() {
    yield takeLatest(DELETE_SILENCE_WITH_ID, makedeleteSilenceWithID);
}
export function * makedeleteSilenceWithID(action) {
    try{
        const silence = yield call(API.deleteSilenceWithID,action.payload);
        if (silence.status &&silence.status !== 200) {
            throw new Error(`StatusCode=${silence.status}`)
        }
        yield put(deleteSilenceWithIDSuccess(silence.data.data));
        yield put(fetchSilenceWithID(action.payload))
    }catch(error){
        yield put(deleteSilenceWithIDFail(error))
    }
}