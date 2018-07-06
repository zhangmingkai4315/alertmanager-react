import _ from 'lodash'
import {FETCH_ALERTS_SUCCESS,
        FETCH_ALERTS_FAIL,
        FETCH_ALERTS,
        TOGGLE_ALERT_NAME,
        TOGGLE_ALERT_SEVERITY,
        TOGGLE_ALERTS_STARTTIME
        } from '../actions/const'

const initAlertState = { 
    alerts:[],
    sort:{'serverity':false,'alertname':false,'alert_starttime':false},
    loading:false,
    error:""
};

const reducer = (state=initAlertState,action) => {
    switch(action.type){
        case FETCH_ALERTS:
            return {...state,loading:true,error:""}
        case FETCH_ALERTS_FAIL:
            return {...state,loading:false,error:action.payload}
        case FETCH_ALERTS_SUCCESS:
            return {...state,loading:false,alerts:action.payload}
        
        case TOGGLE_ALERT_NAME:
            let alertsSortAlertName = _.sortBy(state.alerts,[function(o){return o.labels.alertname}])
            let sortAlertName = {...state.sort,alertname:!state.sort.alertname}
            if(!sortAlertName.alertname){
                alertsSortAlertName = _.reverse(alertsSortAlertName)
            }
            return {...state,alerts:alertsSortAlertName,sort:sortAlertName}

        case TOGGLE_ALERT_SEVERITY:
            let alertsSortSeverity = _.sortBy(state.alerts,[function(o){ return o.labels.severity}])
            let sortSeverity = {...state.sort,serverity:!state.sort.serverity}
            if(!sortSeverity.serverity){
                alertsSortSeverity = _.reverse(alertsSortSeverity)
            }
            return {...state,alerts:alertsSortSeverity,sort:sortSeverity}
            
        case TOGGLE_ALERTS_STARTTIME:
            let alertsSortStartTime = _.sortBy(state.alerts,[function(o){return o.startsAt}])
            let sortStartTime = {...state.sort,alert_starttime:!state.sort.alert_starttime}
            if(!sortStartTime.alert_starttime){
                alertsSortStartTime = _.reverse(alertsSortStartTime)
            }
            return {...state,alerts:alertsSortStartTime,sort:sortStartTime}
        default:
            return state;
    }
}
export default reducer;