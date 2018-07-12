import * as Types from './const';

export const loadAPIURLFromStore = (url)=>{
    return {
        type:Types.LOAD_API_URL_FROM_STORAGE
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