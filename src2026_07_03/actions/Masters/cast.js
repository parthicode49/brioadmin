import { MESSAGE5, CASTS, MESSAGE } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const cast_create = (formData) => async (dispatch) => {
  try {
    const data  = await api.cast_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const cast_update = (formData) => async (dispatch) => {
  try {
    const  data  = await api.cast_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const cast_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.cast_delete(formData);
    dispatch({ type: MESSAGE, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const cast_status_update = (formData) => async (dispatch) => {
  try {
    const { data } = await api.cast_status_update(formData);
    dispatch({ type: MESSAGE, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const all_cast_list = (formData) => async (dispatch) => {
  try {
    const { data } = await api.all_cast_list(formData);

    dispatch({ type: CASTS, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
