import {combineReducers} from 'redux';
import alertsReducer from './alerts';
import statusReducer from './status';
import silencesReducer from './silences';
import globalReducer from './global';

import { reducer as formReducer } from 'redux-form';

const rootReducers = combineReducers({
    alerts: alertsReducer,
    silences: silencesReducer,
    status: statusReducer,
    form:formReducer,
    global:globalReducer
})

export default rootReducers;