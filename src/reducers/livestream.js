import * as actionType from "../constants/actionTypes";

const livestreamReducer = (state = { livestreamData: null }, action) => {
  switch (action.type) {
    case actionType.LIVESTREAM:
      return { ...state, live_stream: action.payload };

    default:
      return state;
  }
};

export default livestreamReducer;
