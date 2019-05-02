import { takeLatest } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import auth from './auth';
import notifications from './notifications';

export default function* rootSaga() {
    yield fork(auth)
    yield fork(notifications)
}