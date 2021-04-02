import { all, fork } from 'redux-saga/effects';
import userSaga from './userSaga';
import postSaga from './postSaga';

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
