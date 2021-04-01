import { LOG_IN, LOG_OUT } from './types';

// 초기값 설정
export const initialState = {
  isLoggedIn: false,
  user: null,
};

// 액션크리에이터함수
export const loginAction = (data) => ({ type: LOG_IN, data });
export const logoutAction = () => ({ type: LOG_OUT });

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.data,
      };
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};
