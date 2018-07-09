import {combineReducers} from 'redux';
import alertsReducer from './alerts';
import statusReducer from './status';
import silencesReducer from './silences';
import { reducer as formReducer } from 'redux-form';

const rootReducers = combineReducers({
    alerts: alertsReducer,
    silences: silencesReducer,
    status: statusReducer,
    form:formReducer
})

export default rootReducers;