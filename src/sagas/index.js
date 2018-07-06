
import { all } from 'redux-saga/effects';
import { fetchAlertsFromAPI,fetchStatusFromAPI} from './sagas';

function* rootSaga(){
    yield all([
        fetchAlertsFromAPI(),
        fetchStatusFromAPI()
    ])
};

export default rootSaga;
