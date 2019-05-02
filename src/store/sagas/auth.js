import { put, call, takeLatest, delay } from 'redux-saga/effects';
import NavigationService from '../../services/NavigationService';

//Action Types and Action Creators
import {
    fetchingAuth,
    requestAuthError,
    clearAuthError,
    USER_STATE_REQUEST,
    userStateSuccess,
    LOGIN_REQUEST,
    loginSuccess,
    LOGOUT_REQUEST,
    logoutSuccess,
    RECOVER_PASSWORD_REQUEST,
    recoverPasswordSuccess
} from '../actions';

// API CALLS
import AuthApi from '../../api/auth.api';

// SAGA HANDLER DA ACTION TYPE USER_STATE_REQUEST 
export function* userStateSaga() {
    // disparando a action que mostra o loader na tela
    yield put(fetchingAuth(true));
    try {

        // chamando a api ou serviço
        const response = yield call(AuthApi.fetchUserStateAsync);

        // disparando a ação de sucesso do request
        yield put(userStateSuccess(response))

        // executando qq outra ação necessária, neste caso navegar para o APP pois o cara está logado!!!
        NavigationService.navigate('App');
    }
    catch (e) {

        // disparando a ação de erro do request que aqui vai nulo pois não precisamos mostrar o erro, apenas jogar o cara na área do Auth
        yield put(requestAuthError(null))

        // executando qq outra ação necessária, jogando o cara no Auth
        NavigationService.navigate('Auth');
    }
}

// SAGA HANDLER DA ACTION TYPE LOGIN_REQUEST
export function* loginSaga({ data }) {
    yield put(fetchingAuth(true));
    try {
        const { email, password } = data;
        const response = yield call(AuthApi.loginAsync, email, password);
        yield put(loginSuccess(response));
        NavigationService.navigate('App');
    }
    catch (e) {
        yield put(requestAuthError({
            message: e.message,
            where: 'login'
        }))
    }
}

// SAGA HANDLER DA ACTION TYPE LOGOUT_REQUEST
export function* logoutSaga() {
    yield put(fetchingAuth(true));
    try {
        const response = yield call(AuthApi.logoutAsync);
        yield put(logoutSuccess())
        NavigationService.navigate('Auth');
    } catch (e) {
        yield put(requestAuthError({
            message: e.message,
            where: 'logout'
        }))
    }
}

// SAGA HANDLER DA ACTION TYPE RECOVER_PASSWORD_REQUEST
export function* recoverPasswordSaga({ data }) {
    yield put(fetchingAuth(true));
    try {
        const { email } = data;
        const response = yield call(AuthApi.recoverPasswordAsync, email);
        yield put(recoverPasswordSuccess());
        NavigationService.back(null);
    } catch (e) {
        yield put(requestAuthError({
            message: e.message,
            where: 'password'
        }));
        //yield delay(3000);
        //yield put(clearAuthError())

    }
}

/**
 * As sagas interceptam as ACTION TYPES de REQUEST disparadas pelos componentes,
 * executam as tarefas e lidam com os side effects.
 * Para cada ACTION TYPE temos uma saga
 * A Saga Handler sempre tem como parâmetro a action creator
 * ex. {type:LOGIN_REQUEST, data}
 */
export default function* auth() {
    yield takeLatest(USER_STATE_REQUEST, userStateSaga);
    yield takeLatest(LOGIN_REQUEST, loginSaga);
    yield takeLatest(LOGOUT_REQUEST, logoutSaga);
    yield takeLatest(RECOVER_PASSWORD_REQUEST, recoverPasswordSaga)
}

