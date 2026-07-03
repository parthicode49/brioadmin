import * as actionType from "../constants/actionTypes";

const otpReducer = (state = { moviesData: null }, action) => {
	switch (action.type) {
		
		case actionType.MESSAGEOTP:
			return {...state,otp_send: action.payload};
		case actionType.MESSAGEOTPVERIFY :
			return {...state,otp_verify : action.payload}	
			
		default:
			return state;
	}
};

export default otpReducer;
