// import { delay } from 'redux-saga';
import { all } from 'redux-saga/effects';
import { fetchAlertsFromAPI } from './alerts';
// function * testHelloAysnc(){
//     yield delay(1000);
//     yield put({type: TEST_HELLO});
// }
// function *watchHelloAsync(){
//     yield takeEvery(TEST_HELLO_ASYNC, testHelloAysnc)
// }

function* rootSaga(){
    yield all([
        fetchAlertsFromAPI()
    ])
};

export default rootSaga;
