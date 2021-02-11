export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "제로초",
      },
      content: "첫 번째 게시글 #해시태그 #익스프레스",
      Images: [
        {
          src:
            "https://images.unsplash.com/photo-1501820488136-72669149e0d4?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8Y2F0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        },
        {
          src:
            "https://images.unsplash.com/photo-1529257414772-1960b7bea4eb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8Y2F0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        },
        {
          src:
            "https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTF8fGNhdHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "nero",
          },
          content: "우와 안뇽~",
        },
        {
          User: {
            nickname: "hero",
          },
          content: "꺄륵",
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  User: {
    id: 1,
    nickname: "mn",
  },
  content: "더미데이터입니다!",
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default: {
      return { ...state };
    }
  }
};

export default reducer;
