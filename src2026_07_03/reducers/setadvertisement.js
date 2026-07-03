import * as actionType from "../constants/actionTypes";

const setAdReducer = (state = { setAdData: null}, action) => {
	switch (action.type) {
		
		case actionType.SETAD:
			return {...state,setad: action.payload};
			case actionType.ADDELETE:
			return {...state,add_delete: action.payload,};	
		default:
			return state;
	}
};

export default setAdReducer;
