import * as actionType from "../constants/actionTypes";

const dashboardReducer = (state = { dashboardData: null }, action) => {
  switch (action.type) {
    case actionType.TOTALUSERS:
      return { ...state, totalusers: action.payload };
    case actionType.DASHBOARDCOUNT:
      return { ...state, dashboardcount: action.payload };
    case actionType.DASHBOARDMOVIES:
      return { ...state, dashboardmovies: action.payload };
    case actionType.TOTALSUBSCRIBEUSER:
      return { ...state, totalsubscribeuser: action.payload };
    case actionType.MONTHLYREVENUE:
      return { ...state, monthlyrevenue: action.payload };
    case actionType.TOTALREVENUE:
      return { ...state, totalrevenue: action.payload };
    case actionType.TV_SHOW_DASHBOARD:
      return { ...state, tv_show_dashboard: action.payload };
    case actionType.RECENT_SUBSCRIBER_DASHBOARD:
      return { ...state, recent_subscriber_dashboard: action.payload };
    case actionType.DAILY_REVENUE:
      return { ...state, daily_revenue: action.payload };
    case actionType.MAX_LOGIN_DURATION:
      return { ...state, max_login_duration: action.payload };
    case actionType.RENEWAL:
      return { ...state, renewal: action.payload };
    case actionType.PRODUCER_MOVIE_GRAPH:
      return { ...state, producer_movie_graph: action.payload };
    case actionType.PRODUCER_MOVIE_LIST:
      return { ...state, producer_movie_list: action.payload };
    case actionType.ADVERTISEMENT_VIEW_GRAPH:
      return { ...state, advertisement_view_graph: action.payload };

    case actionType.HIGHESTMOVIECOUNT:
      return { ...state, highest_movie_tran_count: action.payload };
    case actionType.TOTALREVENUEDIS:
      return { ...state, totalrevenue_dis: action.payload };
    case actionType.MOST_WATCH_MOVIE:
      return { ...state, most_watch_movies: action.payload };
    case actionType.CURRENTLY_LOGGED_IN_USERS_BY_STATE_GRAPH:
      return {
        ...state,
        currently_logged_in_users_by_state_graph: action.payload,
      };
    case actionType.REGION_CHART:
      return { ...state, region_chart: action.payload };

    default:
      return state;
  }
};

export default dashboardReducer;
