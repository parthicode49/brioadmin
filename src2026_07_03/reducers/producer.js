import * as actionType from "../constants/actionTypes";

const producerReducer = (state = { producerData: null }, action) => {
  switch (action.type) {
    // case actionType.PRODUCERFORMDATA:
    //   return { ...state, producerformlist: action.payload };

    // case actionType.PRODUCERFORMDETAILS:
    //   return { ...state, producerformdata: action.payload };
      case actionType.PRODUCERFORMDATA:
        return { ...state, producerformdata: action.payload };
        case actionType.PRODUCERFORMDETAILS : 
        return {...state,formdetail:action.payload}
        case actionType.PRODUCERS : 
        return {...state,producers:action.payload}
        
    default:
      return state;
  }
};

export default producerReducer;
