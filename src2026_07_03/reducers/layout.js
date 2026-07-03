import * as actionType from "../constants/actionTypes";

const layoutReducer = (state = { layoutData: null }, action) => {
  switch (action.type) {
    case actionType.MESSAGE:
      return { ...state, message: action.payload };
    case actionType.LOGGEDIN:
      return { ...state, loggedin: action.payload };
    case actionType.RIGHTS:
      return { ...state, rights: action.payload };
    case actionType.ROLE:
      return { ...state, role: action.payload };
    case actionType.ADVERTISER:
      return { ...state, advertiser: action.payload };
    case actionType.PRODUCER:
      return { ...state, producer: action.payload };
    case actionType.DISTRIBUTOR:
      return { ...state, distributor: action.payload };
    // case actionType.SUBADMIN :
    // 	return {...state, subadmin : action.payload }
    case actionType.PROFILE:
      return { ...state, profile: action.payload };
    case actionType.DARKMODE:
      return { ...state, dark_mode: action.payload };

    default:
      return state;
  }
};

export default layoutReducer;
