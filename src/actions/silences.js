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