import * as actionType from "../constants/actionTypes";

const mastersReducer = (state = { mastersData: null }, action) => {
	switch (action.type) {
		
		case actionType.CATEGORIES:
			return {...state,categories: action.payload};
			case actionType.SUBCATEGORIES:
			return {...state,subcategories: action.payload};
			case actionType.CASTS:
			return {...state,casts: action.payload};
			case actionType.COUNTRIES:
			return {...state,countries: action.payload};
			
			case actionType.GENRE:
			return {...state,genre: action.payload};
			case actionType.SUBOTT:
			return {...state,sub_ott: action.payload};
			case actionType.SONGCATEGORIES:
			return {...state,song_category: action.payload};

			case actionType.LANGUAGES:
			return {...state,languages: action.payload};
			case actionType.AVATARS:
			return { ...state, avatars: action.payload };
			// case actionType.DISTRIBUTORS:
			// return {...state,distributors: action.payload};
			
			case actionType.MODULES:
			return {...state,modules: action.payload};
			case actionType.OTTNAME:
			return {...state,ott_name: action.payload};
			case actionType.SUBADMINS:
			return {...state,subadmins: action.payload};
			case actionType.ADVISORY:
				return {...state,advisory: action.payload};
			case actionType.MESSAGE5:
			return {...state,cast_msg: action.payload};
			case actionType.PAYMENTGATEWAY :
				return {...state , payment_gayeway : action.payload}
			case actionType.COMPLAINT_TYPE :
				return {...state , complaint_type : action.payload}
			case actionType.LIVESTRCATEGORIES :
				return {...state , live_stream_category : action.payload}
			
			
		default:
			return state;
	}
};

export default mastersReducer;
