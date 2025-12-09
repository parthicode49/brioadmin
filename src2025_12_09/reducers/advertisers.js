import * as actionType from "../constants/actionTypes";

const advertisersReducer = (state = { advertisersData: null }, action) => {
  switch (action.type) {
    case actionType.ADVERTISERS:
      return { ...state, advertisers: action.payload };
    case actionType.ADVERTISEMENTS:
      return { ...state, advertisements: action.payload };
    case actionType.ADFORMDETAILS:
      return { ...state, adform: action.payload };
    case actionType.ADVERTISEMENTSADLIST:
      return { ...state, ad_list_adv: action.payload };
    case actionType.ADDDASHBOARD:
      return { ...state, ad_list_dashboard: action.payload };

    default:
      return state;
  }
};

export default advertisersReducer;
