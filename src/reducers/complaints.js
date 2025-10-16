import * as actionType from "../constants/actionTypes";

const complaintsReducer = (state = { complaintsData: null }, action) => {
	switch (action.type) {
		
		case actionType.COMPLAINTS:
			return {...state,complaints: action.payload};
		default:
			return state;
	}
};

export default complaintsReducer;
