import _ from 'lodash'
import {FETCH_ALERTS_SUCCESS,
        FETCH_ALERTS_FAIL,
        FETCH_ALERTS,
        FETCH_RECERVER_FAIL,
        FETCH_RECERVER_SUCCESS,
        TOGGLE_ALERT_NAME,
        TOGGLE_ALERT_SEVERITY,
        TOGGLE_ALERTS_STARTTIME,
        CHECK_INHIBITED,
        CHECK_SILENCED,
        CHANGE_SERCH_TERM,
        SELECT_RECEIVER,
        ALERT_ADD_FILTER,
        ALERT_REMOVE_FILTER,
        } from '../actions/const'

const initAlertState = { 
    alerts:[],
    sort:{
        serverity:false,
        alertname:false,
        alert_starttime:false
    },
    loading:false,
    error:"",
    receivers:["All"],
    search:{
        searchTerm:"",
        inhibited:false,
        silenced:false,
        receiver:"All"
    },
    filters:[],
};

const reducer = (state=initAlertState,action) => {
    switch(action.type){
        case FETCH_ALERTS:
            return {...state,loading:true,error:""}
        case FETCH_ALERTS_FAIL:
            return {...state,loading:false,error:action.payload}
        case FETCH_ALERTS_SUCCESS:
            return {...state,loading:false,alerts:action.payload}

        case FETCH_RECERVER_FAIL:
            return {...state,loading:false,error:action.payload}
        case FETCH_RECERVER_SUCCESS:
            const defaultReceiver=initAlertState.receivers;
            return {...state,loading:false,receivers:defaultReceiver.concat(action.payload)}

        case CHECK_INHIBITED:
            const inhibited = !state.search.inhibited;
            const searchWithNewInhibit = {...state.search,inhibited}
            return {...state,search:searchWithNewInhibit}
        case CHECK_SILENCED:
            const silenced = !state.search.silenced;
            const searchWithNewSilience = {...state.search,silenced}
            return {...state,search:searchWithNewSilience}

        case CHANGE_SERCH_TERM:
            const searchWithNewTerm = {...state.search,searchTerm:action.payload}
            return {...state,search:searchWithNewTerm}

        case SELECT_RECEIVER:
            const searchWithNewReceiver = {...state.search,receiver:action.payload}
            return {...state,search:searchWithNewReceiver}

        case ALERT_ADD_FILTER:
            const addFilterArray = action.payload.split('=');
            let conflict = false;
            const filtersWithConflictDetect = state.filters.map(f=>{
                if(f.split("=")[0] === addFilterArray[0]){
                    conflict = true
                    return f.split("=")[0]+"="+addFilterArray[1]
                }
                return f
            })
            if(conflict===false && filtersWithConflictDetect.indexOf(action.payload)===-1){
                return {...state,filters:filtersWithConflictDetect.concat(action.payload)}
            }
            return {...state,filters:filtersWithConflictDetect};

        case ALERT_REMOVE_FILTER:
            const filterAlerts = state.filters.filter(f=>f!==action.payload)
            return {...state,filters:filterAlerts}            

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