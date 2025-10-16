import { LIVESTREAM, MESSAGE } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const create_live_stream = (formData) => async (dispatch) => {
  try {
    const data = await api.create_live_stream(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const update_live_stream = (formData) => async (dispatch) => {
  try {
    const data = await api.update_live_stream(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const live_stream_status_update = (formData) => async (dispatch) => {
  try {
    const data = await api.live_stream_status_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const delete_live_stream = (formData) => async (dispatch) => {
  try {
    const data = await api.delete_live_stream(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const live_stream_list_admin = (formData) => async (dispatch) => {
  try {
    const data = await api.live_stream_list_admin(formData);
    dispatch({ type: LIVESTREAM, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
