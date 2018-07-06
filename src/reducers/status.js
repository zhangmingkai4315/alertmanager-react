import {FETCH_STATUS_DATA_FAIL,
        FETCH_STATUS_DATA_SUCCESS
        } from '../actions/const'

const initStatus = { 
    status:{},
    loading:false,
    error:""
};

const statusReducer = (state=initStatus,action)=>{
    switch(action.type){
        case FETCH_STATUS_DATA_SUCCESS:
            return {...state,status:action.payload,loading:false}
        case FETCH_STATUS_DATA_FAIL:
            return {...state,loading:false,error:action.payload}
        default:
            return state
    }
}
export default statusReducer;
