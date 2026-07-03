import * as actionType from "../constants/actionTypes";

const reportReducer = (state = { reportData: null }, action) => {
	switch (action.type) {
		
		case actionType.PPV_CUSTOMERS:
			return {...state,ppv_customers: action.payload};
			case actionType.REGISTERED_CUSTOMERS:
			return {...state,registered_customers: action.payload};
			case actionType.SUBSCRIBED_CUSTOMERS:
			return {...state,subscribed_customers: action.payload};
	
			
		default:
			return state;
	}
};

export default reportReducer;
