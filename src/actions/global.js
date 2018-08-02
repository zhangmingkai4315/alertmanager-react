import * as Types from './const';

export const loadAPIURLFromStore = (apiUrl,historyUrl)=>{
    return {
        type:Types.LOAD_API_URL_FROM_STORAGE,
        payload: {apiUrl,historyUrl}
    }
}

export const connectAlertManagerURL = (url) =>{
    return {
        type: Types.CONNECT_ALERTMANAGER_URL,
        payload: url
    }
}

export const connectAlertManagerURLSuccess = (status) =>{
    return {
        type: Types.CONNECT_ALERTMANAGER_URL_SUCCESS,
        payload: status
    }
}
export const connectAlertManagerURLFail = (error) =>{
    return {
        type: Types.CONNECT_ALERTMANAGER_URL_FAIL,
        payload: error
    }
}

export const connectHistoryServerURL = (url) =>{
    return {
        type: Types.CONNECT_HISTORY_SERVER_URL,
        payload: url
    }
}

export const connectHistoryServerURLSuccess = (status) =>{
    return {
        type: Types.CONNECT_HISTORY_SERVER_URL_SUCCESS,
        payload: status
    }
}
export const connectHistoryServerURLFail = (error) =>{
    return {
        type: Types.CONNECT_HISTORY_SERVER_URL_FAIL,
        payload: error
    }
}