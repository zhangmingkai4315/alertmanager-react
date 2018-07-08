
import { all } from 'redux-saga/effects';
import { fetchAlertsFromAPI,
         fetchReceiverFromAPI,
         fetchAlertsUsingSearchBox,
         fetchSilencesFromAPI,
         fetchStatusFromAPI} from './sagas';

function* rootSaga(){
    yield all([
        fetchAlertsFromAPI(),
        fetchReceiverFromAPI(),
        fetchStatusFromAPI(),
        fetchAlertsUsingSearchBox(),
        fetchSilencesFromAPI(),
    ])
};

export default rootSaga;
