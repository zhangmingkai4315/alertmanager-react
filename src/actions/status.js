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

