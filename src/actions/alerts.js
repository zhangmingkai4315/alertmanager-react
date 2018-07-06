import * as Types from './const';

export function fetchAlerts(){
    return {
        type:Types.FETCH_ALERTS,
    }
}

export function fetchAlertsSuccess(alerts) {
    return {
        type: Types.FETCH_ALERTS_SUCCESS,
        payload:alerts
    }
}

export function fetchAlertsFail(error){
    return {
        type:Types.FETCH_ALERTS_FAIL,
        payload:error
    }
}

export function toggleAlertName(){
    return{
        type:Types.TOGGLE_ALERT_NAME
    }
}

export function toggleAlertStartTime(){
    return {
        type:Types.TOGGLE_ALERTS_STARTTIME
    }
}

export function toggleAlertSeverity(){
    return {
        type: Types.TOGGLE_ALERT_SEVERITY
    }
}

export function fetchReceiver(){
    return{
        type: Types.FETCH_RECERVER
    }
}

export function fetchReceiverFail(error){
    return{
        type: Types.FETCH_RECERVER_FAIL,
        payload: error
    }
}
export function fetchReceiverSuccess(receiver){
    return{
        type: Types.FETCH_RECERVER_SUCCESS,
        payload: receiver
    }
}

export function checkInhibited(){
    return {
        type: Types.CHECK_INHIBITED
    }
}
export function checkSilenced(){
    return {
        type: Types.CHECK_SILENCED
    }
}

export function changeSearchTerm(term){
    return {
        type: Types.CHANGE_SERCH_TERM,
        payload:term
    }
}

export function selectReceiver(receiver){
    return {
        type:Types.SELECT_RECEIVER,
        payload: receiver
    }
}