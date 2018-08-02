import * as Types from './const';

export function searchHistoryAlerts(search){
    return {
        type:Types.SEARCH_HISTORY_ALERTS,
        payload: search
    }
}

export function searchHistoryAlertsSuccess(alerts) {
    return {
        type: Types.SEARCH_HISTORY_ALERTS_SUCCESS,
        payload:alerts
    }
}

export function searchHistoryAlertsFail(error){
    return {
        type:Types.SEARCH_HISTORY_ALERTS_FAIL,
        payload:error
    }
}