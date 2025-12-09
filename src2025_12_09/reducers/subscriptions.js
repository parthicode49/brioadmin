import * as actionType from "../constants/actionTypes";

const subscriptionsReducer = (state = { subscriptionsData: null }, action) => {
	switch (action.type) {
		
		case actionType.SUBSCRIPTIONS:
			return {...state,subscriptions: action.payload};
	
			
		default:
			return state;
	}
};

export default subscriptionsReducer;
