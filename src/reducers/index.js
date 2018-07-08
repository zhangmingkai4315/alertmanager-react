import {combineReducers} from 'redux';
import alertsReducer from './alerts';
import statusReducer from './status';
import silencesReducer from './silences';
const rootReducers = combineReducers({
    alerts: alertsReducer,
    silences: silencesReducer,
    status: statusReducer
})

export default rootReducers;