import { MESSAGE, COMPLAINT_TYPE } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const complaint_type_create = (formData) => async (dispatch) => {
  try {
    const data = await api.complaint_type_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const complaint_type_update = (formData) => async (dispatch) => {
  try {
    const data = await api.complaint_type_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const complaint_type_delete = (formData) => async (dispatch) => {
  try {
    const data = await api.complaint_type_delete(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const complaint_type_status_update = (formData) => async (dispatch) => {
  try {
    const data = await api.complaint_type_status_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const complaint_type_list_admin = (formData) => async (dispatch) => {
  try {
    const data = await api.complaint_type_list_admin(formData);
    dispatch({ type: COMPLAINT_TYPE, payload: data?.data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
