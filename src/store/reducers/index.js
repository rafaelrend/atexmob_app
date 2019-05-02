import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import notifications from './notifications';

const rootReducer = combineReducers({
    form: formReducer,
    auth,
    notifications
});

export default rootReducer;