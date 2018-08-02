
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
         searchHistoryAlertsFromAPI,
         fetchStatusFromAPI} from './sagas';

function* rootSaga(){
    yield all([
        searchHistoryAlertsFromAPI(),
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
