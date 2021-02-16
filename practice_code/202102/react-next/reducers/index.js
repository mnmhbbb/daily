const initialState = {
  nickname: "yenni",
};

export const userCheck = {
  type: "USER_CHECK",
  data: "yerini",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_CHECK":
      return {
        ...state,
        name: action.data,
      };
  }
};

export default reducer;
