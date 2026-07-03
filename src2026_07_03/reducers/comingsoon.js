import * as actionType from "../constants/actionTypes";

const comingsoonReducer = (state = { comingsoonData: null }, action) => {
  switch (action.type) {
    case actionType.COMINGSOON:
      return { ...state, coming_soon: action.payload };
    default:
      return state;
  }
};

export default comingsoonReducer;
