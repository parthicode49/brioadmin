import { MESSAGE, SUBCATEGORIES } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const subcategory_create = (formData) => async (dispatch) => {
  try {
    const data = await api.subcategory_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const subcategory_update = (formData) => async (dispatch) => {
  try {
    const data = await api.subcategory_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const subcategory_sequence_update = (formData) => async (dispatch) => {
  try {
    const data = await api.subcategory_sequence_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const subcategory_status_update = (formData) => async (dispatch) => {
  try {
    const { data } = await api.subcategory_status_update(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const subcategory_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.subcategory_delete(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const all_subcategory_list = (formData) => async (dispatch) => {
  try {
    const { data } = await api.all_subcategory_list(formData);

    dispatch({ type: SUBCATEGORIES, payload: data });
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
