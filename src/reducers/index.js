import {combineReducers} from 'redux';
import alertsReducer from './alerts';

const rootReducers = combineReducers({
    alerts: alertsReducer
})

export default rootReducers;