import {TEST_ALERTMANAGER_URL,
        TEST_ALERTMANAGER_URL_FAIL,
        TEST_ALERTMANAGER_URL_SUCCESS,
        LOAD_API_URL_FROM_STORAGE} from '../actions/const'

const initState = {
    apiUrl:'',
    loading:false,
    error:""
}

const globalReducer = (state=initState,action) =>{
    switch(action.type){
        case TEST_ALERTMANAGER_URL:
            return {...state,loading:true,error:""}
        case LOAD_API_URL_FROM_STORAGE:
            const apiUrl = localStorage.getItem('apiUrl')
            return {...state,apiUrl};
        case TEST_ALERTMANAGER_URL_FAIL:
            localStorage.removeItem('apiUrl');
            return {...state,url:"",loading:false,error:action.payload}
        case TEST_ALERTMANAGER_URL_SUCCESS:
            localStorage.setItem('apiUrl',action.payload);
            return {...state,apiUrl:action.payload,loading:false}
        default:
            return state
    }
}

export default globalReducer;