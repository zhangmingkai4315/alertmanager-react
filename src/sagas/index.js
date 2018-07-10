
import { all } from 'redux-saga/effects';
import { fetchAlertsFromAPI,
         fetchReceiverFromAPI,
         fetchAlertsUsingSearchBox,
         fetchSilencesFromAPI,
         fetchSilencesWithIDFromAPI,
         postNewSilence,
         deleteSilenceWithIDFromAPI,
         fetchStatusFromAPI} from './sagas';

function* rootSaga(){
    yield all([
        fetchAlertsFromAPI(),
        fetchReceiverFromAPI(),
        fetchStatusFromAPI(),
        fetchAlertsUsingSearchBox(),
        fetchSilencesFromAPI(),
        fetchSilencesWithIDFromAPI(),
        postNewSilence(),
        deleteSilenceWithIDFromAPI()
    ])
};

export default rootSaga;
