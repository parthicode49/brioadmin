import * as actionType from "../constants/actionTypes";

const transactionsReducer = (state = { transactionsData: null }, action) => {
	switch (action.type) {
		
		case actionType.TRANSACTIONS:
			return {...state,transactions: action.payload};
		case actionType.TRANSACTIONSLOADING:
			return {...state,transactions_loading: action.payload};
	
			
		default:
			return state;
	}
};

export default transactionsReducer;
