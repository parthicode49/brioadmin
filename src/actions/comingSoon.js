import { MESSAGE, COMINGSOON } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const coming_soon_create = (formData) => async (dispatch) => {
  try {
    const data = await api.coming_soon_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const coming_soon_update = (formData) => async (dispatch) => {
  try {
    const data = await api.coming_soon_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const coming_soon_status_update = (formData) => async (dispatch) => {
  try {
    const {data} = await api.coming_soon_status_update(formData);
    dispatch({ type: MESSAGE, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const coming_soon_delete = (formData) => async (dispatch) => {
  try {
    const {data} = await api.coming_soon_delete(formData);
    dispatch({ type: MESSAGE, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const all_coming_soon_list_admin = (formData) => async (dispatch) => {
  try {
    const {data} = await api.all_coming_soon_list_admin(formData);
    dispatch({ type: COMINGSOON, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
