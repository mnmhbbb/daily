import axios from 'axios';
import { all, call, fork, takeLatest, delay, put } from 'redux-saga/effects';
import shortid from 'shortid';
import { generateDummyPost } from '../reducers/post';
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_SUCCESS,
  REMOVE_POST_SUCCESS,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

function addPostAPI(data) {
  return axios.post('/api/post', data);
}

function removePostAPI(data) {
  return axios.delete('/api/post', data);
}

function loadPostAPI(data) {
  return axios.post('/api/posts', data);
}

function* addPost(action) {
  try {
    console.log('saga addpost');
    // const result = yield call(addPostAPI, action.data)
    yield delay(1000);
    const id = shortid.generate(); // 랜덤한 id값 부여
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
    });
    yield put({
      // 글 작성할 때 내 글 갯수 반영하기 위함
      type: ADD_POST_TO_ME,
      data: id, //
    });
  } catch {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      data: err.res.data,
    });
  }
}

function* removePost(action) {
  try {
    // const result = yield call(removePostAPI, action.data);
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      // 글 삭제할 때 글 갯수 반영하기 위함
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: err.res.data,
    });
  }
}

function* loadposts(action) {
  try {
    // const result = yield call(loadPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: generateDummyPost(5), // 더미데이터 5개씩 불러오기
    });
  } catch {
    console.error(err);
    yield put({
      type: LOAD_POST_FAILURE,
      data: err.res.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchRemovePost), fork(watchLoadPosts)]);
}
