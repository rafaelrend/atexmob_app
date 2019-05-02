import {
  FETCHING_NOTIFICATIONS,
  REQUEST_NOTIFICATION_ERROR,
  UPDATE_BADGE_COUNT,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATION_SUCCESS,
  UPDATE_NOTIFICATION_SUCCESS
} from '../actions';

const INITIAL_STATE = {
  fetching: false,
  error: null,
  list: null,
  item: null,
  statusFilter: null,
  perPage: null,
  dashCount: 3,
  badgeCount: 0
}

const notifications = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_NOTIFICATIONS:
      return { ...state, fetching: action.fetching, error: null }

    case REQUEST_NOTIFICATION_ERROR:
      return { ...state, fetching: false, error: action.error }

    case UPDATE_BADGE_COUNT:
      const naoLidas = state.list.filter(n => !n.lido);
      return { ...state, badgeCount: naoLidas.length || 0 }

    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        fetching: false,
        list: action.data
      }

    case FETCH_NOTIFICATION_SUCCESS:
    case UPDATE_NOTIFICATION_SUCCESS:
      // manipular a lista para atualizar o item alterado
      return { ...state, fetching: false, item: action.data }

    default:
      return state;
  }
}

export default notifications;