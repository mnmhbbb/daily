import shortid from 'shortid';
import faker from 'faker';

// 액션 타입
export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

// 포스트 더미데이터
const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: '고니',
  },
  Image: [],
});

// 랜덤으로 불러올 더미데이터
export const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map(() => ({
      id: shortid.generate(),
      User: {
        id: shortid.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.paragraph(),
      Images: [
        {
          src: faker.image.image(),
        },
      ],
    }));

// 초기값 설정
export const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true, // 인피니트스크롤링

  addPostLoading: false, // 포스트 추가
  addPostDone: false,
  addPostError: null,
  removePostsLoading: false, // 포스트 삭제
  removePostsDone: false,
  removePostsError: null,
  loadPostsLoading: false, // 포스트 불러오기
  loadPostsDone: false,
  loadPostsError: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        addPostLoading: false,
        addPostDone: true,
        mainPosts: [dummyPost, ...state.mainPosts],
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        removePostLoading: false,
        removePostDone: true,
        mainPosts: mainPosts.filter((v) => v.id !== action.data),
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        removePostLoading: false,
        removePostError: action.error,
      };
    case LOAD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case LOAD_POST_SUCCESS:
      return {
        ...state,
        addPostLoading: false,
        mainPosts: action.data.concat(mainPosts),
      };
    case LOAD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    default:
      return state;
  }
};
