import * as actionType from "../constants/actionTypes";

const merchandiseReducer = (state = { merchandiseData: null }, action) => {
  switch (action.type) {
    case actionType.COUPONS:
      return { ...state, coupons: action.payload };
    case actionType.COUPONHISTORY:
      return { ...state, couponhistory: action.payload };
    case actionType.NOTIFICATIONS:
      return { ...state, notifications: action.payload };
    case actionType.NOTIFICATIONS_COUNT:
      return { ...state, notifications_count: action.payload };
    case actionType.NOTIFICATION_READ:
      return { ...state, notification_read: action.payload };
    case actionType.SLIDER_BANNERS:
      return { ...state, slider_banners: action.payload };
    case actionType.SONG_SLIDER_BANNERS:
      return { ...state, song_slider_banners: action.payload };
    case actionType.COUPONS_MOVIE:
      return { ...state, coupon_movie: action.payload };
    case actionType.COUPONS_SERIES:
      return { ...state, coupon_series: action.payload };
    case actionType.NOTIFICATION_DISTRIBUTOR:
      return { ...state, notification_list_distributor: action.payload };

    default:
      return state;
  }
};

export default merchandiseReducer;
