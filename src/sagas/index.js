
import { all } from 'redux-saga/effects';
import { fetchAlertsFromAPI,
         fetchReceiverFromAPI,
         fetchAlertsUsingSearchBox,
         fetchSilencesFromAPI,
         fetchSilencesWithIDFromAPI,
         postNewSilence,
         deleteSilenceWithIDFromAPI,
         connectAlertmanagerURLFromAPI,
         connectHistoryURLFromAPI,
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
        deleteSilenceWithIDFromAPI(),
        connectHistoryURLFromAPI(),
        connectAlertmanagerURLFromAPI()
    ])
};
export default rootSaga;
