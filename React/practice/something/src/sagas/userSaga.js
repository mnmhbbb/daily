import axios from 'axios';
import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import { LOG_IN_FAILURE, , LOG_IN_SUCCESS, LOG_IN_REQUEST, LOG_OUT_REQUEST, SIGN_UP_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE, SIGN_UP_SUCCESS, SIGN_UP_FAILURE} from '../reducers/user';

// 서버가 있다면 이런 방식으로...
function logInAPI(data) {
    return axios.post('/api/login', data)
}

function logOutAPI() {
    return axios.post('/api/logOut')
}

function signUpAPI() {
    return axios.post('/api/sigin')
}

function* logIn(action) {
    try{
        console.log('saga login');
        // const result = yield call(logInAPI, action.data)
        // 일단 delay로 비동기적인 효과를 주기로.
        yield delay(1000);
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOG_IN_FAILURE,
            error: err.res.data,
        })
    }
}

function* logOut() {
    try{
        console.log('saga logout');
        // const result = yield call(logOutAPI)
        yield delay(1000);
        yield put({
            type: LOG_OUT_SUCCESS,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.res.data,
        })
    }
}

function* signUp() {
    try{
        console.log('saga signup');
        // const result = yield call(signUpAPI)
        yield delay(1000);
        yield put({
            type: SIGN_UP_SUCCESS,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.res.data,
        })
    }
}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn)
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut)
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp)
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchSignUp)]);
}
