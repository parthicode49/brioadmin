import { MESSAGE, PROMOTION } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const quick_promotion_create = (formData) => async (dispatch) => {
  try {
    const data = await api.quick_promotion_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const quick_promotion_update = (formData) => async (dispatch) => {
  try {
    const data = await api.quick_promotion_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const quick_promotion_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.quick_promotion_delete(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const promotion_status_update = (formData) => async (dispatch) => {
  try {
    const { data } = await api.promotion_status_update(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const all_quick_promotion_list = (formData) => async (dispatch) => {
  try {
    const { data } = await api.all_quick_promotion_list(formData);
    dispatch({ type: PROMOTION, payload: data });
  } catch (error) {
    console.log(error);
  }
};
