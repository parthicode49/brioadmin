import * as actionType from "../constants/actionTypes";

const highlightReducer = (state = { highlightData: null }, action) => {
	switch (action.type) {
		
		case actionType.HIGHLIGHT:
			return {...state,highlights: action.payload};
			
			
		default:
			return state;
	}
};

export default highlightReducer;
