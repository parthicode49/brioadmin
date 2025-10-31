import * as actionType from "../constants/actionTypes";

const webseriesReducer = (state = { webseriesData: null }, action) => {
	switch (action.type) {
		
		case actionType.EPISODES:
			return {...state,episodes: action.payload};
			case actionType.EPISODE:
			return {...state,episode: action.payload};
			case actionType.EPISODE_LIST_LOADING:
			return {...state,episode_loading: action.payload};

			
			case actionType.SEASONS:
			return {...state,seasons: action.payload};
			case actionType.SEASONS_NAME:
			return {...state,only_season_name: action.payload};
			case actionType.SERIES:
			return {...state,series: action.payload};
			case actionType.EPISODE_WATCH_USER:
			return {...state,episode_watch_user: action.payload};
			case actionType.EPAUDIOFILEDELETE:
			return {...state,seasons: action.payload};
			case actionType.EPSUBTITLEDELETE:
			return {...state,seasons: action.payload};
			case actionType.SERIESDIS:
			return {...state,series_dis: action.payload};
	
			case actionType.SERIESDETAILS:
				return { ...state, series_detail: action.payload };
			case actionType.SERIESNAME:
				return { ...state, series_name: action.payload };
			case actionType.SERIES_LIST_LOADING:
				return { ...state, series_loading: action.payload };
		default:
			return state;
	}
};

export default webseriesReducer;
