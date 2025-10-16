import * as actionType from "../constants/actionTypes";

const contentLeavingReducer = (state = { complaintsData: null }, action) => {
    switch (action.type) {
        
        case actionType.CONTENT_LEAVING_SOON:
            return {...state,content_leaving_soon: action.payload};
        default:
            return state;
    }
};

export default contentLeavingReducer;
