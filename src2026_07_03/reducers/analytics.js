import * as actionType from "../constants/actionTypes";

const analyticsReducer = (state = { dashboardData: null }, action) => {
  switch (action.type) {
    
    case actionType.HIGHEST_WATCHED_MOVIES_GRAPH:
      return { ...state, highest_watched_movies_graph: action.payload };
      case actionType.LOWEST_WATCHED_MOVIES:
      return { ...state, lowest_watched_movies: action.payload };
    case actionType.HIGHEST_WATCHED_SERIES_GRAPH:
      return { ...state, highest_watched_series_graph: action.payload };
      case actionType.LOWEST_WATCHED_SERIES:
      return { ...state, lowest_watched_series: action.payload };
    case actionType.HIGHEST_WATCHED_SONG_GRAPH:
      return { ...state, highest_watched_song_graph: action.payload };
      case actionType.LOWEST_WATCHED_SONG:
      return { ...state, lowest_watched_song: action.payload };
      case actionType.HIGHEST_SEARCHED_MOVIES_GRAPH:
      return { ...state, highest_searched_movies_graph: action.payload };
      case actionType.CURRENTLY_LOGGED_IN_USERS:
      return { ...state, currently_logged_in_users: action.payload };
      case actionType.CURRENTLY_WATCHING_USERS:
      return { ...state, currently_watching_users: action.payload };
      case actionType.DEVICE_USED_FOR_WATCHING:
      return { ...state, device_used_for_watching: action.payload };
      case actionType.AREA_WISE_AD_VIEW:
        return { ...state, area_wise_ad_view: action.payload };
      
    default:
      return state;
  }
};

export default analyticsReducer;
