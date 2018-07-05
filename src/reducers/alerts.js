import {FETCH_ALERTS_SUCCESS,FETCH_ALERTS_FAIL,FETCH_ALERTS} from '../actions/const'
const initAlertState = { alerts:[],loading:false,error:""};

const reducer = (state=initAlertState,action) => {
    switch(action.type){
        case FETCH_ALERTS:
            return {...state,loading:true,error:""}
        case FETCH_ALERTS_FAIL:
            return {...state,loading:false,error:action.payload}
        case FETCH_ALERTS_SUCCESS:
            return {...state,loading:false,alerts:action.payload}
        default:
            return state;
    }
}
export default reducer;