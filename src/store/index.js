import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {loadAPIURLFromStore} from '../actions'
import reducers from '../reducers'
import rootSagas from '../sagas';

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware];
let composeEnhancers = compose;

if (process.env.NODE_ENV !== "production") {
  composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
}


const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(reducers, {}, enhancer);
sagaMiddleware.run(rootSagas);
store.dispatch(loadAPIURLFromStore())

export default store;