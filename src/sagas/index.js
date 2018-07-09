
import { all } from 'redux-saga/effects';
import { fetchAlertsFromAPI,
         fetchReceiverFromAPI,
         fetchAlertsUsingSearchBox,
         fetchSilencesFromAPI,
         fetchSilencesWithIDFromAPI,
         fetchStatusFromAPI} from './sagas';

function* rootSaga(){
    yield all([
        fetchAlertsFromAPI(),
        fetchReceiverFromAPI(),
        fetchStatusFromAPI(),
        fetchAlertsUsingSearchBox(),
        fetchSilencesFromAPI(),
        fetchSilencesWithIDFromAPI(),
    ])
};

export default rootSaga;
