import * as actionType from "../constants/actionTypes";

const distributorsReducer = (state = { distributorsData: null }, action) => {
	switch (action.type) {
		
		case actionType.DISTRIBUTORS:
			return {...state,distributors: action.payload};
		case actionType.DISTRIBUTORS_FORM_LIST:
			return {...state,distributors_form_list: action.payload};
	
			
		default:
			return state;
	}
};

export default distributorsReducer;
