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