import {
    SEARCH_HISTORY_ALERTS,
    SEARCH_HISTORY_ALERTS_FAIL,
    SEARCH_HISTORY_ALERTS_SUCCESS
} from '../actions/const'

const initHistoryAlertsState = { 
    alerts:[],
    loading:false,
    error:"",
    search:{
        term:"",
        startsAt:null,
        endsAt:null
    },
    filters:[],
    sort:{
        serverity:false,
        alertname:false,
        alert_starttime:false
    },    
};

const reducer = (state=initHistoryAlertsState,action) => {
    switch(action.type){
        case SEARCH_HISTORY_ALERTS:
            return {...state,loading:true,error:""}
        case SEARCH_HISTORY_ALERTS_FAIL:
            return {...state,loading:false,error:action.payload}
        case SEARCH_HISTORY_ALERTS_SUCCESS:
            return {...state,loading:false,error:"",alerts:action.payload}
        default:
            return state;
    }
}
export default reducer;