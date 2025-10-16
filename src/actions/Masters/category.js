import { MESSAGE, CATEGORIES } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const category_create = (formData) => async (dispatch) => {
  try {
    const data = await api.category_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    console.log(error);
     dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const category_update = (formData) => async (dispatch) => {
  try {
    const data = await api.category_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const category_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.category_delete(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const category_status_update = (formData) => async (dispatch) => {
  try {
    const { data } = await api.category_status_update(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const all_category_list = (formData) => async (dispatch) => {
  try {
    const data = await api.all_category_list(formData);
    dispatch({ type: CATEGORIES, payload: data?.data });
    return data;
  } catch (error) {
    console.log(error);
     dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
