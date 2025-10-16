import * as actionType from "../constants/actionTypes";

const songReducer = (state = { songData: null }, action) => {
  switch (action.type) {
    case actionType.SONG_LIST:
      return { ...state, song_list: action.payload };
    case actionType.SONG_DETAIL:
      return { ...state, song_detail: action.payload };
    case actionType.SONG_WATCH_USER:
      return { ...state, song_watch_list: action.payload };
    case actionType.SONG_NAME_LIST:
      return { ...state, song_name_list: action.payload };

    default:
      return state;
  }
};

export default songReducer;
