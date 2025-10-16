import { MESSAGE, TOP_TEN_VIDEOS } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const top_ten_create = (formData) => async (dispatch) => {
  try {
    const data = await api.top_ten_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const top_ten_update = (formData) => async (dispatch) => {
  try {
    const data = await api.top_ten_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const top_ten_delete = (formData) => async (dispatch) => {
  try {
    const data = await api.top_ten_delete(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const all_top_ten_list_admin = (formData) => async (dispatch) => {
  try {
    const data = await api.all_top_ten_list_admin(formData);
    dispatch({ type: TOP_TEN_VIDEOS, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: TOP_TEN_VIDEOS, payload: error?.response?.data });
    return error?.response?.data;
  }
};
