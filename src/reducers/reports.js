import * as actionType from "../constants/actionTypes";

const reportsReducer = (state = { reportsData: null}, action) => {
	switch (action.type) {
		
		case actionType.REPORTS:
			return {...state,reports: action.payload};
			// case actionType.MOVIE:
			// return {...state,movie: action.payload,showLoading:false};	
		default:
			return state;
	}
};

export default reportsReducer;
