import * as actionType from "../constants/actionTypes";

const distributorDashboardReducer = (
  state = { dashboardData: null },
  action
) => {
  switch (action.type) {
    case actionType.DIS_MOST_WATCH_MOVIE:
      return { ...state, most_watch_movie: action.payload };
    case actionType.DIS_MOST_WATCH_SERIES:
      return { ...state, most_watch_series: action.payload };
    case actionType.DIS_MOST_WATCH_SONG:
      return { ...state, most_watch_song: action.payload };
    case actionType.DIS_REVENUE_WATCH_MOVIE:
      return { ...state, movie_wise_revenue: action.payload };
    case actionType.DIS_REVENUE_WATCH_SERIES:
      return { ...state, series_wise_revenue: action.payload };
    case actionType.DIS_REVENUE_WATCH_SONG:
      return { ...state, song_wise_revenue: action.payload };
    case actionType.DIS_DASHBOARD_COUNT:
      return { ...state, dashboard_count: action.payload };
    default:
      return state;
  }
};

export default distributorDashboardReducer;
