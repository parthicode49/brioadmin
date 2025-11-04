import { MESSAGE, SUBADMINS, MODULES } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const subadmin_create = (formData) => async (dispatch) => {
  try {
    const data = await api.subadmin_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const subadmin_update = (formData) => async (dispatch) => {
  try {
    const  data  = await api.subadmin_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const subadmin_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.subadmin_delete(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const all_subadmin_list = (formData) => async (dispatch) => {
  try {
    const { data } = await api.all_subadmin_list(formData);

    dispatch({ type: SUBADMINS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const all_module_listing = (formData) => async (dispatch) => {
  try {
    const { data } = await api.all_module_listing(formData);

    dispatch({ type: MODULES, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const subadmin_status_update = (formData) => async (dispatch) => {
  try {
    const { data } = await api.subadmin_status_update(formData);

    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
