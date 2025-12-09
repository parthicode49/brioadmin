 import * as actionType from "../constants/actionTypes";

const mastersReducer = (state = { mastersData: null }, action) => {
	switch (action.type) {
		
		

			case actionType.REFUNDPOLICY:
			return {...state,refundpolicy: action.payload};
			case actionType.ABOUTUS:
			return {...state,aboutus: action.payload};

			case actionType.TERMSCONDITIONS:
			return {...state,termsconditions: action.payload};
			case actionType.PRIVACYPOLICY:
			return {...state,privacypolicy: action.payload};
			case actionType.APPSETTING:
			return {...state,appsetting: action.payload};
			case actionType.LOGS:
				return {...state,logs: action.payload};
				case actionType.LOGSDEC:
				return {...state,logsdis: action.payload}
			
			
		default:
			return state;
	}
};

export default mastersReducer;
