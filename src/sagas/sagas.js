

import {call, put,race,takeLatest, throttle,select} from 'redux-saga/effects';
import { delay } from 'redux-saga'

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
         CONNECT_ALERTMANAGER_URL,
         CONNECT_HISTORY_SERVER_URL,
         FETCH_SILENCE_WITH_ID,
         SEARCH_HISTORY_ALERTS} from '../actions/const';
         
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
        fetchSilenceWithAffectedAlerts,
        connectHistoryServerURLFail,
        connectHistoryServerURLSuccess,
        connectAlertManagerURLSuccess,
        connectAlertManagerURLFail,
        searchHistoryAlertsSuccess,
        searchHistoryAlertsFail} from '../actions';

export function *searchHistoryAlertsFromAPI(){
    yield takeLatest(SEARCH_HISTORY_ALERTS, searchHistoryAlerts)
}

export function *searchHistoryAlerts(action){
    try{
        const {results,timeout} = yield race({
            results:call(API.searchHistoryAlerts,action.payload),
            timeout:call(delay,5000)
        })
        if(results){
            if (results.status &&results.status !== 200) {
                throw new Error(`Search History Alerts:StatusCode=${results.status}`)
            }
            // console.log(results)
            if(!results.data){
                yield put(searchHistoryAlertsFail("Response data decode fail"))
                return
            }
            if(!results.data.data || results.data.data.length===0){
                yield put(searchHistoryAlertsFail("Not Found"))
                return
            }
            yield put(searchHistoryAlertsSuccess(results.data.data))
        }else if(timeout){
            yield put(searchHistoryAlertsFail("Search Timeout"))
        }
    }catch(error){
        yield put(searchHistoryAlertsFail(`Search History Alerts: ${error}`))
    }    
}

export function *connectAlertmanagerURLFromAPI() {
    yield takeLatest(CONNECT_ALERTMANAGER_URL, connectAlertManagerURL);
}

export function *connectAlertManagerURL(action) {
    try{
        const {connectResult,timeout} = yield race({
            connectResult:call(API.connectAlertManagerURL,action.payload),
            timeout:call(delay,5000)
        })
        if(connectResult){
            if (connectResult.status &&connectResult.status !== 200) {
                throw new Error(`AlertManager:StatusCode=${connectResult.status}`)
            }
            yield put(connectAlertManagerURLSuccess(action.payload))
        }else if(timeout){
            yield put(connectAlertManagerURLFail("Connection Timeout"))
        }
    }catch(error){
        yield put(connectAlertManagerURLFail(`AlertManager: ${error}`))
    }
}

export function *connectHistoryURLFromAPI() {
    yield takeLatest(CONNECT_HISTORY_SERVER_URL, connectHistoryServerURL);
}

export function *connectHistoryServerURL(action) {
    try{
        const {connectResult,timeout} = yield race({
            connectResult:call(API.connectHistoryServerURL,action.payload),
            timeout:call(delay,5000)
        })
        if(connectResult){
            if (connectResult.status && connectResult.status !== 200) {
                throw new Error(`HistoryServer:StatusCode=${connectResult.status}`)
            }
            yield put(connectHistoryServerURLSuccess(action.payload))
        }else if(timeout){
            yield put(connectHistoryServerURLFail("Connection Timeout"))
        }
    }catch(error){
        yield put(connectHistoryServerURLFail(`HistoryServer: ${error}`))
    }
}

export function *fetchAlertsFromAPI() {
    // first get all alerts(inhibited=false,silienced=false)
    yield takeLatest(FETCH_ALERTS, makeFetchAlerts);
}
export function *fetchAlertsUsingSearchBox(){
    // refresh alert with search infomation
    yield throttle(500,[SELECT_RECEIVER,
                        CHECK_INHIBITED,
                        CHECK_SILENCED,
                        ALERT_ADD_FILTER,
                        ALERT_REMOVE_FILTER], makeFetchAlerts);
}
export function *makeFetchAlerts() {
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

export function *fetchReceiverFromAPI() {
    yield takeLatest(FETCH_RECERVER, makeFetchReceivers);
}
export function *makeFetchReceivers() {
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


export function *fetchStatusFromAPI(){
    yield takeLatest(FETCH_STATUS_DATA, makeFetchStatus);
}
export function *makeFetchStatus() {
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


export function *fetchSilencesFromAPI() {
    yield takeLatest(FETCH_SILENCES, makeFetchSilences);
}
export function *makeFetchSilences() {
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


export function *fetchSilencesWithIDFromAPI() {
    yield takeLatest(FETCH_SILENCE_WITH_ID, makeFetchSilenceWithID);
}
export function *makeFetchSilenceWithID(action) {
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

export function *postNewSilence() {
    yield takeLatest(POST_NEW_SILENCE, makePostNewSilence);
}
export function *makePostNewSilence(action) {
    try{
        const silence = yield call(API.postNewSilence,action.payload);
        if (silence.status &&silence.status !== 200) {
            throw new Error(`StatusCode=${silence.status}`)
        }
        yield call([localStorage,'setItem'],'createdBy',action.payload.createdBy)
        yield put(postNewSilenceSuccess(silence.data.data));
    }catch(error){
        yield put(postNewSilenceFail(error))
    }
}


export function *deleteSilenceWithIDFromAPI() {
    yield takeLatest(DELETE_SILENCE_WITH_ID, makedeleteSilenceWithID);
}
export function *makedeleteSilenceWithID(action) {
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

