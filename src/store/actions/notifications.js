export const FETCH_NOTIFICATIONS_REQUEST = 'FETCH_NOTIFICATIONS_REQUEST';
export const FETCH_NOTIFICATIONS_SUCCESS = 'FETCH_NOTIFICATIONS_SUCCESS';
export const FETCH_NOTIFICATION_REQUEST = 'FETCH_NOTIFICATION_REQUEST';
export const FETCH_NOTIFICATION_SUCCESS = 'FETCH_NOTIFICATION_SUCCESS';
export const UPDATE_NOTIFICATION_REQUEST = 'UPDATE_NOTIFICATION_REQUEST';
export const UPDATE_NOTIFICATION_SUCCESS = 'UPDATE_NOTIFICATION_SUCCESS';

export const UPDATE_BADGE_COUNT = 'UPDATE_BADGE_COUNT';

export const FETCHING_NOTIFICATIONS = 'FETCHING_NOTIFICATIONS';
export const REQUEST_NOTIFICATION_ERROR = 'REQUEST_NOTIFICATION_ERROR';

export const fetchNotificationsRequest = params => ({
  type: FETCH_NOTIFICATIONS_REQUEST,
  params
})
export const fetchNotificationsSuccess = data => ({
  type: FETCH_NOTIFICATIONS_SUCCESS,
  data
})

export const updateBadgeCount = () => ({
  type: UPDATE_BADGE_COUNT
})

export const fetchNotificationRequest = id => ({
  type: FETCH_NOTIFICATION_REQUEST,
  id
})
export const fetchNotificationSuccess = data => ({
  type: FETCH_NOTIFICATION_SUCCESS,
  data
})

export const updateNotificationRequest = data => ({
  type: UPDATE_NOTIFICATION_REQUEST,
  data
})
export const updateNotificationSuccess = data => ({
  type: UPDATE_NOTIFICATION_SUCCESS,
  data
})

export const fetchingNotifications = fetching => ({
  type: FETCHING_NOTIFICATIONS,
  fetching
})

export const requestNotificationError = error => ({
  type: REQUEST_NOTIFICATION_ERROR,
  error
})