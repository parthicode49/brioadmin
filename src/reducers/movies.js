import * as actionType from "../constants/actionTypes";

const moviesReducer = (state = { moviesData: null }, action) => {
  switch (action.type) {
    case actionType.MOVIES:
      return { ...state, movies: action.payload };
    case actionType.MOVIE:
      return { ...state, movie: action.payload };
    case actionType.MOVIELISTLOADING:
      return { ...state, movie_loading: action.payload };

    case actionType.UPCOMING_MOVIES:
      return { ...state, upcoming_movies: action.payload };
    case actionType.MOVIE_WATCH_USER:
      return { ...state, movie_watch_user: action.payload };
    case actionType.MOVIENAMELIST:
      return { ...state, movie_name: action.payload };
    case actionType.TOP_TEN_VIDEOS:
      return { ...state, top_ten_videos: action.payload };

    default:
      return state;
  }
};

export default moviesReducer;
