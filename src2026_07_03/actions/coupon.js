import {
  MESSAGE,
  COUPONS,
  COUPONHISTORY,
  COUPONS_MOVIE,
  COUPONS_SERIES,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const coupon_create = (formData) => async (dispatch) => {
  try {
    const data = await api.coupon_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const coupon_update = (formData) => async (dispatch) => {
  try {
    const data = await api.coupon_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const coupon_status_update = (formData) => async (dispatch) => {
  try {
    const data = await api.coupon_status_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
     dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const coupon_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.coupon_delete(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const all_coupon_list = (formData) => async (dispatch) => {
  try {
    const { data } = await api.all_coupon_list(formData);

    dispatch({ type: COUPONS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const coupon_details = (formData) => async (dispatch) => {
  try {
    const { data } = await api.coupon_details(formData);
    console.log(data, "actions");
    dispatch({ type: COUPONHISTORY, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const movie_list_for_promocode = (formData) => async (dispatch) => {
  try {
    const { data } = await api.movie_list_for_promocode(formData);
    console.log(data, "actions");
    dispatch({ type: COUPONS_MOVIE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const series_list_for_promocode = (formData) => async (dispatch) => {
  try {
    const { data } = await api.series_list_for_promocode(formData);
    console.log(data, "actions");
    dispatch({ type: COUPONS_SERIES, payload: data });
  } catch (error) {
    console.log(error);
  }
};
