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