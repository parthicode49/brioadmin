import { MESSAGE, COUNTRIES } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const country_create = (formData) => async (dispatch) => {
  try {
    const data = await api.country_create(formData);

    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const country_update = (formData) => async (dispatch) => {
  try {
    const data  = await api.country_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const country_status_update = (formData) => async (dispatch) => {
  try {
    const { data } = await api.country_status_update(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const country_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.country_delete(formData);

    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const all_country_list = (formData) => async (dispatch) => {
  try {
    const { data } = await api.all_country_list(formData);

    dispatch({ type: COUNTRIES, payload: data });
  } catch (error) {
    console.log(error);
  }
};
