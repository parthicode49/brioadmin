import {
  ADSLIDER_BANNERS,
  MESSAGE,

} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const advertisement_banner_create = (formData) => async (dispatch) => {
  try {
    const data = await api.advertisement_banner_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const advertisement_banner_update = (formData) => async (dispatch) => {
  try {
    const data = await api.advertisement_banner_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const advertisement_banner_status_update = (formData) => async (dispatch) => {
  try {
    const data = await api.advertisement_banner_status_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const advertisement_banner_delete = (formData) => async (dispatch) => {
  try {
    const data = await api.advertisement_banner_delete(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const advertisement_banner_list_admin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.advertisement_banner_list_admin(formData);
    dispatch({ type: ADSLIDER_BANNERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};