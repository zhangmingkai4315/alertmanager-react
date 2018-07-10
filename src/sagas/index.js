
import { all } from 'redux-saga/effects';
import { fetchAlertsFromAPI,
         fetchReceiverFromAPI,
         fetchAlertsUsingSearchBox,
         fetchSilencesFromAPI,
         fetchSilencesWithIDFromAPI,
         postNewSilence,
         fetchStatusFromAPI} from './sagas';

function* rootSaga(){
    yield all([
        fetchAlertsFromAPI(),
        fetchReceiverFromAPI(),
        fetchStatusFromAPI(),
        fetchAlertsUsingSearchBox(),
        fetchSilencesFromAPI(),
        fetchSilencesWithIDFromAPI(),
        postNewSilence()
    ])
};

export default rootSaga;
