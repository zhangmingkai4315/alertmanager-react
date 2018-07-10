import {FETCH_SILENCES,
        FETCH_SILENCES_FAIL,
        SHOW_SILENCES_WITH_STATUS,
        FETCH_SILENCE_WITH_ID,
        FETCH_SILENCE_WITH_ID_SUCCESS,
        FETCH_SILENCE_WITH_ID_FAIL,
        FETCH_SILENCES_SUCCESS,
        POST_NEW_SILENCE,
        POST_NEW_SILENCE_FAIL,
        POST_NEW_SILENCE_SUCCESS,
        DELETE_SILENCE_WITH_ID,
        DELETE_SILENCE_WITH_ID_FAIL,
        DELETE_SILENCE_WITH_ID_SUCCESS} from '../actions/const'

const initSilencesState = { 
    silences:[],
    currentSilence:null,
    sort:{
        serverity:false,
        alertname:false,
        alert_starttime:false
    },
    loading:false,
    error:"",
    search:{
        searchTerm:"",
        inhibited:false,
        silenced:false
    },
    filtedSilences:[],
    info:null
};

const reducer = (state=initSilencesState,action) => {
  switch(action.type){
    case FETCH_SILENCES:
    case FETCH_SILENCE_WITH_ID:
    case POST_NEW_SILENCE:
    case DELETE_SILENCE_WITH_ID:
        return {...state,loading:true,error:"",info:null}
    case FETCH_SILENCES_FAIL:
    case FETCH_SILENCE_WITH_ID_FAIL:
    case POST_NEW_SILENCE_FAIL:
    case DELETE_SILENCE_WITH_ID_FAIL:
        return {...state,loading:false,error:action.payload}
    case FETCH_SILENCES_SUCCESS:
        return {...state,loading:false,silences:action.payload,filtedSilences:action.payload}
    case SHOW_SILENCES_WITH_STATUS:
        let filtedSilences = state.silences;
        if(action.payload!==''){
          filtedSilences = state.silences.filter(s=>s.status.state===action.payload)
        }
        return {...state,filtedSilences,filted:true}
    case FETCH_SILENCE_WITH_ID_SUCCESS:
        return {...state,currentSilence:action.payload,loading:false}
    case POST_NEW_SILENCE_SUCCESS:
        return {...state,loading:false,info:{create:action.payload}}
    case DELETE_SILENCE_WITH_ID_SUCCESS:
        return {...state,loading:false,info:{delete:action.payload}}
    default:
        return state;
  }
}

export default reducer;
