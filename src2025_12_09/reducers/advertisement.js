import * as actionType from "../constants/actionTypes";

const advertisementReducer = (state = { advertisementData: null }, action) => {
  switch (action.type) {
    case actionType.ADVERTISEMENT:
      return { ...state, advertisement_list: action.payload };

    default:
      return state;
  }
};

export default advertisementReducer;
