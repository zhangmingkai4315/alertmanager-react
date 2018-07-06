import {combineReducers} from 'redux';
import alertsReducer from './alerts';
import statusReducer from './status';

const rootReducers = combineReducers({
    alerts: alertsReducer,
    status: statusReducer
})

export default rootReducers;