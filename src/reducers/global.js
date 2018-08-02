import {CONNECT_ALERTMANAGER_URL,
        CONNECT_ALERTMANAGER_URL_FAIL,
        CONNECT_ALERTMANAGER_URL_SUCCESS,
        LOAD_API_URL_FROM_STORAGE,
        CONNECT_HISTORY_SERVER_URL,
        CONNECT_HISTORY_SERVER_URL_SUCCESS,
        CONNECT_HISTORY_SERVER_URL_FAIL} from '../actions/const'

const initState = {
    apiUrl:"",
    historyUrl:"",
    loading:false,
    error:""
}

const globalReducer = (state=initState,action) =>{
    switch(action.type){
        case CONNECT_ALERTMANAGER_URL:
        case CONNECT_HISTORY_SERVER_URL:
            return {...state,loading:true,error:""}
        case LOAD_API_URL_FROM_STORAGE:
            return {...state,
                    apiUrl:action.payload.apiUrl,
                    historyUrl:action.payload.historyUrl};
        case CONNECT_ALERTMANAGER_URL_FAIL:
            localStorage.removeItem('apiUrl');
            return {...state,apiUrl:"",loading:false,error:action.payload}
        case CONNECT_HISTORY_SERVER_URL_FAIL:
            localStorage.removeItem('historyUrl');
            return {...state,historyUrl:"",loading:false,error:action.payload}
        case CONNECT_ALERTMANAGER_URL_SUCCESS:
            localStorage.setItem('apiUrl',action.payload);
            return {...state,apiUrl:action.payload,loading:false}
        case CONNECT_HISTORY_SERVER_URL_SUCCESS:
            localStorage.setItem('historyUrl',action.payload);
            return {...state,historyUrl:action.payload,loading:false}        
        default:
            return state
    }
}

export default globalReducer;