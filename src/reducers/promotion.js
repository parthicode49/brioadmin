import * as actionType from "../constants/actionTypes";

const promotionReducer = (state = { promotionData: null}, action) => {
	switch (action.type) {
		
		case actionType.PROMOTION:
			return {...state,promotion: action.payload};
			// case actionType.MOVIE:
			// return {...state,movie: action.payload,showLoading:false};	
		default:
			return state;
	}
};

export default promotionReducer;
