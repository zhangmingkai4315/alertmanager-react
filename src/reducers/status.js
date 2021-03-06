import {FETCH_STATUS_DATA_FAIL,
        FETCH_STATUS_DATA_SUCCESS,
        FETCH_STATUS_DATA,
        TEST_ALERTMANAGER_URL_FAIL,
        TEST_ALERTMANAGER_URL_SUCCESS,
        TEST_ALERTMANAGER_URL
        } from '../actions/const'

const initStatus = { 
    status:{},
    test:false,
    loading:false,
    error:""
};

const statusReducer = (state=initStatus,action)=>{
    switch(action.type){
        case FETCH_STATUS_DATA:
            return {...state,error:"", loading:true}
        case TEST_ALERTMANAGER_URL:
            return {...state,error:"", loading:true,test:false}
        case TEST_ALERTMANAGER_URL_SUCCESS:
            return {...state,test:true,loading:false}
        case FETCH_STATUS_DATA_SUCCESS:
            return {...state,status:action.payload,loading:false}
        case FETCH_STATUS_DATA_FAIL:
        case TEST_ALERTMANAGER_URL_FAIL:
            return {...state,loading:false,error:action.payload}
        default:
            return state
    }
}
export default statusReducer;
