import { delay } from 'redux-saga';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import NavigationService from '../../services/NavigationService';

//Action Types and Action Creators
import {
  fetchingNotifications,
  requestNotificationError,
  FETCH_NOTIFICATIONS_REQUEST,
  fetchNotificationsSuccess,
  FETCH_NOTIFICATION_REQUEST,
  fetchNotificationSuccess,
  UPDATE_NOTIFICATION_REQUEST,
  updateNotificationSuccess,
  updateBadgeCount
} from '../actions';

// API Calls
import NotificationsApi from '../../api/notifications.api';

export function* fetchNotificationsSaga({ params }) {
  yield put(fetchingNotifications(true));
  try {
    const uid = yield select(state => state.auth.user.uid || state.auth.user.id);
    const response = yield call(NotificationsApi.fetchNotifications, 108, params);
    //console.log(response)
    yield put(fetchNotificationsSuccess(response));
    yield put(updateBadgeCount())
  } catch (e) {
    yield put(requestNotificationError(e.message));
  }
}

export function* fetchNotificationSaga({ id }) {
  yield put(fetchingNotifications(true));
  try {
    const response = yield call(NotificationsApi.fetchNotification, id);
    yield put(fetchNotificationSuccess(response));
  } catch (e) {
    yield put(requestNotificationError(e.message));
  }
}

export function* updateNotificationSaga({ data }) {
  yield put(fetchingNotifications(true));
  try {
    let response;
    if (data.id) {
      response = yield call(NotificationsApi.updateNotification, data);
    } else {
      response = yield call(NotificationsApi.postItem, data);
    }
    yield put(updateNotificationSuccess(response));
    yield put(updateBadgeCount())
  } catch (e) {
    yield put(requestNotificationError(e.message));
  }
}

export default function* notifications() {
  yield takeLatest(FETCH_NOTIFICATIONS_REQUEST, fetchNotificationsSaga);
  yield takeLatest(FETCH_NOTIFICATION_REQUEST, fetchNotificationSaga);
  yield takeLatest(UPDATE_NOTIFICATION_REQUEST, updateNotificationSaga);
}