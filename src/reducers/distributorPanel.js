import * as actionType from "../constants/actionTypes";

const distributorPanelReducer = (
  state = { distributorPanelData: null },
  action
) => {
  switch (action.type) {
    case actionType.CONTENT_FORM:
      return { ...state, content_form_list: action.payload };
    case actionType.DISTRIBUTOR_MOVIE:
      return { ...state, distributor_movie: action.payload };
    case actionType.DISTRIBUTOR_SERIES:
      return { ...state, distributor_series: action.payload };
    case actionType.DISTRIBUTOR_SONG:
      return { ...state, distributor_song: action.payload };
    case actionType.DISTRIBUTOR_PROMOCODE:
      return { ...state, distributor_promocode: action.payload };

    default:
      return state;
  }
};

export default distributorPanelReducer;
