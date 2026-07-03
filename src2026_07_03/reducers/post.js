import * as actionType from "../constants/actionTypes";

const postReducer = (state = { postData: null }, action) => {
  switch (action.type) {
    case actionType.POSTS:
      return { ...state, posts: action.payload };
      case actionType.POST:
        return { ...state, post: action.payload };
    default:
      return state;
  }
};

export default postReducer;
