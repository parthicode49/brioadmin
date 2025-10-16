import * as actionType from "../constants/actionTypes";

const advertisementsReducer = (
  state = { advertisementsData: null },
  action
) => {
  switch (action.type) {
    case actionType.ADVERTISEMENTS:
      return { ...state, advertisements: action.payload };
    case actionType.ADPAYMENTLIST:
      return { ...state, adpaymentlist: action.payload };
    case actionType.ADPAY:
      return { ...state, adpayment: action.payload };
    default:
      return state;
  }
};

export default advertisementsReducer;
