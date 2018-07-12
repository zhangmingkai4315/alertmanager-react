import * as Types from './const';
export const fetchStatusData = () =>{
    return {
        type: Types.FETCH_STATUS_DATA
    }
}

export const fetchStatusDataSuccess = (status) =>{
    return {
        type: Types.FETCH_STATUS_DATA_SUCCESS,
        payload: status
    }
}
export const fetchStatusDataFail = (error) =>{
    return {
        type: Types.FETCH_STATUS_DATA_FAIL,
        payload: error
    }
}

export const testAlertManagerURL = (url) =>{
    return {
        type: Types.TEST_ALERTMANAGER_URL,
        payload: url
    }
}

export const testAlertManagerURLSuccess = (status) =>{
    return {
        type: Types.TEST_ALERTMANAGER_URL_SUCCESS,
        payload: status
    }
}
export const testAlertManagerURLFail = (error) =>{
    return {
        type: Types.TEST_ALERTMANAGER_URL_FAIL,
        payload: error
    }
}