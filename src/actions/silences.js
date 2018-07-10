import * as Types from './const';

export function fetchSilences(){
    return {
        type:Types.FETCH_SILENCES,
    }
}

export function fetchSilencesSuccess(silences) {
    return {
        type: Types.FETCH_SILENCES_SUCCESS,
        payload:silences
    }
}

export function fetchSilencesFail(error){
    return {
        type:Types.FETCH_SILENCES_FAIL,
        payload:error
    }
}


export function showSilencesWithStatus(status){
  return {
      type:Types.SHOW_SILENCES_WITH_STATUS,
      payload:status
  }
}

export function fetchSilenceWithID(id){
    return {
        type:Types.FETCH_SILENCE_WITH_ID,
        payload:id
    }
}

export function fetchSilenceWithIDSuccess(silence) {
    return {
        type: Types.FETCH_SILENCE_WITH_ID_SUCCESS,
        payload:silence
    }
}

export function fetchSilenceWithIDFail(error){
    return {
        type:Types.FETCH_SILENCE_WITH_ID_FAIL,
        payload:error
    }
}


export function postNewSilence(silence){
    return {
        type:Types.POST_NEW_SILENCE,
        payload:silence
    }
}

export function postNewSilenceSuccess(data) {
    return {
        type: Types.POST_NEW_SILENCE_SUCCESS,
        payload:data
    }
}

export function postNewSilenceFail(error){
    return {
        type:Types.POST_NEW_SILENCE_FAIL,
        payload:error
    }
}


export function deleteSilenceWithID(id){
    return {
        type:Types.DELETE_SILENCE_WITH_ID,
        payload:id
    }
}

export function deleteSilenceWithIDSuccess(silence) {
    return {
        type: Types.DELETE_SILENCE_WITH_ID_SUCCESS,
        payload:silence
    }
}

export function deleteSilenceWithIDFail(error){
    return {
        type:Types.DELETE_SILENCE_WITH_ID_FAIL,
        payload:error
    }
}